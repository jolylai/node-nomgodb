var User = require('../models/users')

// singup
exports.signup = function (req,res) {
	var _user = req.body.user
	var user = new User(_user)
	User.find({name:_user.name},function (err,user) {
		if (err) {
			console.log(err)
		}
		if (user) {
			// 注册的用户名已经存在
			return res.redirect('/signin')
		}else{
			user.save(function (err,user) {
				if (err) {
					console.log(err)
				}
				console.log(user)
				res.redirect('/')
			})
		}
	})
}

// signin
exports.signin = function (req,res) {
	var _user = req.body.user
	var name = _user.name
	var password = _user.password

	User.findOne({name: name},function (err,user) {
		if (err) {
			console.log(err)
		}
		if (!user) {
			return res.redirect('/singup')
		}
		user.comparePassword(password,function (err,isMatch) {
			if (err) {
				console.log(err)
			}
			if (isMatch) {
				res.session.user = user
				return res.redirect('/')
			}else{
				return res.redirect('/signin')
			}
		})

	})
}
// logout
exports.logout = function (req,res) {
	// body...
}
exports.showSignin = function (req,res) {
	res.render('signin')
}
exports.showSignup = function (req,res) {
	res.render('signup')
}
// userlist
exports.userlist = function (req,res) {
	User.fetch(function (err,users) {
		if (err) {
			console.log(err)
		}
		res.render('userlist',{
			title: '用户列表页',
			users: users
		})
	})
}
exports.signinRequired = function (req,res,next) {
	var user = req.session.user
	if (!user) {
		return res.redirect('/signin')
	}
	next()
}
exports.adminRequired = function (req,res,next) {
	var user = req.session.user
	if (user.role<= 10 ) {
		return res.redirect('/signin')
	}
	next()
}