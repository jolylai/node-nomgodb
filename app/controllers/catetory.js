var Catetory = require('../models/catetory')
var mongoose = require('mongoose')

// admin post movie 提交页面
exports.save = function (req,res) {
	var _catetory = req.body.catetory
	var catetory = new Catetory(_catetory)

	catetory.save(function (err,catetory) {
		if (err) {
			console.log(err)
		}
		res.redirect('/admin/catetory/list')
	})
	
}

exports.list = function (req,res) {
	Catetory.fetch(function (err,catetories) {
		if (err) {
			console.log(err)
		}
		res.render('catetorylist',{
			title: '分类列表',
			catetories: catetories
		})
	})
}
// admin page
exports.new = function (req,res) {
	res.render('catetory',{
		title: '后台分类录入页',
		catetory: {}
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
