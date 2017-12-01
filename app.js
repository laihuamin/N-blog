const express = require('express')
const app = new express()

app.get('/', (req, res) => {
    res.send("Hello Node");
})

app.get('/users/:name', (req, res) => {
    res.send(`Hello ${req.params.name}`)
})

app.listen(3000)
