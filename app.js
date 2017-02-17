var express = require('express')
var path = require('path')
var port = process.env.PORT || 3000
var app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
// 回话持久化
// var serveStatic = require('serve-static')
// var bodyParser = require('body-parser')
var dburl = 'mongodb://localhost:27017/imooc'
mongoose.connect(dburl)
mongoose.Promise = global.Promise
// app.use(bodyParser.urlencoded())
// app.use(serveStatic('bower_components')
// 格式化时间
app.locals.moment =require('moment')
app.set('views','./app/views/pages')
app.set('view engine','jade')


var mongostore = require('connect-mongo')(express)
var session = require('express-session')
app.use(session({
  secret: 'imooc',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}))

// 提交表单 数据格式化
app.use(bodyParser.urlencoded({ extended: true }))
// 静态资源目录  /表示public目录下
app.use(express.static(path.join(__dirname,'public')))
// app.use(express.cookieParser())
// app.use(express.session({
// 	sexret: 'imooc',
// 	store: new mongostore({
// 		url: dburl,
// 		collection: 'session'
// 	})
// }))
// require('./config/routes')(app)
require('./config/routes')(app)

app.listen(port)
console.log('started on port' + port)
// 开发环境设置
if ('development' === app.get('env')) {
	app.set('showStackError',true)
	// app.use(express.logger(':method :url :status'))
	// 网页不压缩代码
	app.locals.pretty = true
	mongoose.set('debug',true)
}