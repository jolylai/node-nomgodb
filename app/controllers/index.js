var Movie = require('../models/movie')
var Catetory = require('../models/catetory')

// index page
exports.index = function (req,res) {
	// console.log("user in session")
	// console.log(req.session.user)
	Catetory
		.find({})
		.populate({path: 'movies',options: {limit: 5}})
		.exec(function (err,catetories) {
			if (err) {
				console.log(err)
			}
			res.render('index',{
				title: '电影首页',
				catetories: catetories
			})
		})
	// Movie.fetch(function (err,movies) {
	// 	if (err) {
	// 		console.log(err)
	// 	}
	// 	res.render('index',{
	// 		title: '电影首页',
	// 		movies: movies
	// 	})
	// })
}