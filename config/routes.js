var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
var Comment = require('../app/controllers/comment')
// 配置路由
// Index
module.exports = function (app) {

// pre handle user
app.use(function(req, res, next) {
	var _user = req.session.user

	app.locals.user = _user
	next()
})

app.get('/',Index.index)

// Movie
app.get('/movie/:id',Movie.detail)
app.get('/admin/update/:id',Movie.update)
app.post('/admin/movie/new',Movie.new)
app.post('/admin/movie',Movie.save)
app.get('/admin/list', Movie.list)
app.delete('/admin/list',Movie.del)

// User
app.post('/user/signup',User.signup)
app.post('/user/signin',User.signin)
app.get('/user/logout',User.logout)
app.get('/user/list',User.signinRequired,User.adminRequired,User.userlist)
app.get('/signin',User.showSignin)
app.get('/signup',User.showSignup)

// comment
app.post('/user/comment',User.signinRequired,Comment.save)
}