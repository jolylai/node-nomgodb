var Movie = require('../models/movie')
var Comment = require('../models/comment')
var Catetory = require('../models/catetory')
var _ = require('underscore')
// detail page
exports.detail = function (req,res) {
	// 取得id号
	var id = req.params.id
	Movie.findById(id,function (err,movie) {
		Comment
			.find({movie: id})
			.populate('from','name')
			.populate('replay.from replay.to','name')
			.exec(function (err,comments) {
				console.log('comments: ')
				console.log(comments)
				res.render('detail',{
					title: '详情页',
					movie: movie,
					comments: comments
				})
				
			})
	})
}
// admin post movie 提交页面
exports.save = function (req,res) {
	var id = req.body.movie._id 
	var movieObj = req.body.movie
	console.log(movieObj)
	var _movie
	if (id !== 'undefined') {
		Movie.findById(id,function (err,movie) {
			if (err) {
				console.log(err)
			}
			// underscore用新对象替换旧对象
			_movie = _.extend(movie,movieObj)
			_movie.save(function (err,movie) {
				if (err) {
					console.log(err)
				}
				res.redirect('/movie/'+ movie._id)
			})
		})
	}
	else{
		_movie =new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			flash: movieObj.flash,
			summary: movieObj.summary
		})
		var catetoryId = _movie.catetory
		_movie.save(function (err,movie) {
			if (err) {
				console.log(err)
			}
			res.redirect('/movie/' + movie._id)
		})
	}
	
}

// admin page
exports.new = function (req,res) {
	Catetory.find({},function (err,catetories) {
		if (err) {
			console.log(err)
		}
		res.render('admin',{
			title: '后台录入页',
			catetories: catetories,
			movie: {
				title:'',
				doctor:'',
				country: '',
				year:'',
				poster:'',
				flash:'',
				summary:'',
				language:''
			}
		})
	})
}
// list page
exports.list = function (req,res) {
	Movie.fetch(function (err,movies) {
		if (err) {
			console.log(err)
		}
		res.render('list',{
			title: '列表页',
			movies: movies
		})
	})
}


// list delete movie
exports.del = function (req,res) {
	var id = req.query.id
	if (id) {
		Movie.remove({_id:id},function (err,movie) {
			if (err) {
				console.log(err)
			}else{
				res.json({sucess: 1})
			}
		})
	}
}

// admin update movie
exports.update = function (req,res) {
	var id = req.params.id
	if (id) {
		Movie.findById(id,function (err,movie) {
			res.render('admin',{
				title: '电影后台更新页',
				movie: movie
			})
		})
	}
}