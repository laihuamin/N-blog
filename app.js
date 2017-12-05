const path = require('path')
const express = require('express')
const app = new express()
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const routes = require('./routes')
const pkg = require('./package')
const config = require('config-lite')(__dirname)

// 模版引擎存放目录
app.set('views', path.join(__dirname, 'views'))
// 设置模版引擎为ejs
app.set('view engine', 'ejs')

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// 设置全局模版常量
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}

// 添加三个模版变量
app.use((req, res, next) => {
    res.locals.user = req.session.user
    res.locals.success = req.flash('success').toString()
    res.locals.error = req.flash('error').toString()
    next()
})

// session中间件
app.use(session({
    // 设置cookie中的session id 字段
    name: config.session.key,
    // 通过设置hash计算放在cookie中，防止cookie被篡改
    secret: config.session.secret,
    resave: true,  // 强制更新session
    saveUninitialized: false, //强制创建一个session，即使用户没有登录
    cookie: {
        maxAge: config.session.maxAge   //cookie的有效时间
    },
    // mongodb的储存路径
    store: new MongoStore({
        url: config.mongodb
    })
}))

// 用flash中间件来通知信息
app.use(flash())

// 路由
routes(app)

// 监听端口
app.listen(config.port, () => {
    console.log(`${pkg.name} listen to this port`)
})
