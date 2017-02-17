var Movie = require('../models/movie')
var User = require('../models/users')
var _ = require('underscore')
// 配置路由
// inde page
module.exports = function (app) {

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
	var id = req.params.id
	if (id) {
		Movie.findById(id,function (err,movie) {
			res.render('admin',{
				title: '电影后台更新页',
				movie: movie
			})
		})
	}
})

// singup
app.post('/user/signup',function (req,res) {
	var _user = req.body.user
	var user = new User(_user)
	User.find({name:_user.name,function (err,user) {
		if (err) {
			console.log(err)
		}
	}})
	user.save(function (err,user) {
		if (err) {
			console.log(err)
		}
		console.log(user)
		res.redirect('/admin/userlist')
	})
})

app.get('/admin/userlist',function (req,res) {
	User.fetch(function (err,users) {
		if (err) {
			console.log(err)
		}
		res.render('userlist',{
			title: '用户列表页',
			users: users
		})
	})
})
// admin post movie 提交页面
app.post('/admin/movie/new',function (req,res) {
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
}