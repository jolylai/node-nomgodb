var Index = require('../app/controllers/index')
var Movie = require('../app/controllers/movie')
var User = require('../app/controllers/user')
// 配置路由
// Index
module.exports = function (app) {

app.use(function (res,res,next) {
	var _user = req.session.user
	app.locals.user =_user
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
app.get('/user/userlist',User.signinRequired,User.adminRequired,User.userlist)
app.get('/signin',User.showSignin)
app.get('/signup',User.showSignup)
}