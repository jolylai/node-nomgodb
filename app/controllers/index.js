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
// search
exports.search = function (req,res) {
	var catId = req.query.cat
	var page = parseInt(req.query.p)
	var count = 2
	var index = page * count
	if (catId) {
	Catetory
		.find({_id: catId})
		.populate({
			path: 'movies',
			select: 'title poster',
		})
		.exec(function (err,catetories) {
			if (err) {
				console.log(err)
			}
			var catetory = catetories[0] || {}
			var movies =catetory.movies || []
			var results= movies.slice(index,index+count)
			res.render('results',{
				title: '搜索结果',
				keyword: catetory.name,
				currentPage: (page+1),
				query: 'cat='+ catId,
				totalPage: Math.ceil(movies.length /count),
				movies: results
			})
		})
	}
}