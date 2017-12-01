const path = require('path')
const express = require('express')
const app = new express()
const indexRouter = require('./routes/index.js')
const usersRouter = require('./routes/users.js')

// 模版引擎存放目录
app.set('views', path.join(__dirname, 'views'))
// 设置模版引擎为ejs
app.set('view engine', 'ejs')

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.listen(3000)
