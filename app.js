var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var app = express()
var mongoose = require('mongoose')

var bodyParser = require('body-parser')
// var serveStatic = require('serve-static')
// var bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost:27017/imooc')
mongoose.Promise = global.Promise
// app.use(bodyParser.urlencoded())
// app.use(serveStatic('bower_components')
// 格式化时间
app.locals.moment =require('moment')
app.set('views','./views/pages')
app.set('view engine','jade')
// 提交表单 数据格式化
app.use(bodyParser.urlencoded({ extended: true }))
// 静态资源目录  /表示public目录下
app.use(express.static(path.join(__dirname,'public')))
app.listen(port)
require('./config/routes')(app)
console.log('started on port' + port)

