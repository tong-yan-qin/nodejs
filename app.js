var express = require('express')
var bodyParser = require('body-parser')
var session = require('express-session')

var path = require('path')
var app = express()

var router = require ('./router')
//开放资源
// app.use('/public/',express.static('./public/'))
// app.use('/node_modules/',express.static('./node_modules/'))

//绝对路径 path操作路径 _dirname 动态的绝对路径  
//开放资源
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))
app.set('views', path.join(__dirname, './views/')) 
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
  secret: 'tong',
  resave: false,
  saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))

//挂载路由
app.use(router)

app.get('/', function (req,res){
	res.render('index.html')
})

app.listen(3000,function () {
	console.log('running')
})