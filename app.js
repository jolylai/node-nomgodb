var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var app = express()
var mongoose = require('mongoose')
var Movie = require('./models/movie')
// var User = require('./models/user')
var _ = require('underscore')
var bodyParser = require('body-parser')
// var serveStatic = require('serve-static')
// var bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/imooc')
mongoose.Promise = global.Promise
// app.use(bodyParser.urlencoded())
// app.use(serveStatic('bower_components')
app.locals.moment =require('moment')
app.set('views','./views/pages')
app.set('view engine','jade')
// 提交表单 数据格式化
app.use(bodyParser.urlencoded({ extended: true }))
// 静态资源目录
app.use(express.static(path.join(__dirname,'public')))
app.listen(port)

console.log('started on port' + port)

// 配置路由
// inde page
app.get('/',function (req,res) {
	Movie.fetch(function (err,movies) {
		if (err) {
			console.log(err)
		}
		res.render('index',{
			title: '电影首页',
			movies: movies
		})
	})
})

// detail page
app.get('/movie/:id',function (req,res) {
	// 取得id号
	var id = req.params.id
	Movie.findById(id,function (err,movie) {
		res.render('detail',{
			title: movie.title + '详情页',
			movie: movie
		})
	})
})
// admin update movie
app.get('/admin/update/:id',function (req,res) {
	var id =req.params.id
	if (id) {
		Movie.findById(id,function (err,movie) {
			res.render('admin',{
				title: '电影后台更新页',
				movie:movie
			})
		})
	}
})

// singup
// app.post('/user/signup',function () {
// 	var _user = req.body.user
// 	console.log(_user)
// })

// admin post movie 提交页面
app.post('/admin/movie/new',function (req,res) {
	var id = req.body.movie._id 
	var movieObj =req.body.movie
	console.log(movieObj)
	var _movie
	if (id  !== 'undefind') {
		Movie.findById(id,function (err,movie) {
			if (err) {
				console.log(err)
			}
			_movie = _.extend(movie,movieObj)
			_movie.save(function (err,movie) {
				if (err) {
					console.log(err)
				}
				res.redirect('/movie/'+movie._id)
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
		_movie.save(function (err,movie) {
			if (err) {
				console.log(err)
			}
			res.redirect('/movie/' + movie._id)
		})
	}
	
})

// admin page
app.get('/admin/movie',function (req,res) {
	res.render('admin',{
		title: '后台录入页',
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
// list page
app.get('/admin/list',function (req,res) {
	Movie.fetch(function (err,movies) {
		if (err) {
			console.log(err)
		}
		res.render('list',{
			title: '列表页',
			movies: movies
		})
	})
})


// list delete movie
app.delete('/admin/list',function (req,res) {
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
})