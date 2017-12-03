const express = require('express')
const app = new express()

app.use((req, res, next) => {
    console.log(1);
    next(new Error('haha'));
})

app.use((req, res, next) => {
    console.log(2)
    res.status(200).end()
})

//错误处理

app.use((err, req, res, next) => {
    console.log('this error')
    res.status(500).send('something broke')
})

app.listen(3000)