const express = require('express')
const app = new express()
const indexRouter = require('./routes/index.js')
const usersRouter = require('./routes/users.js')

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.listen(3000)
