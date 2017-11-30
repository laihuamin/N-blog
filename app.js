const express = require('express')
const app = new express()

app.get('/', (req, res) => {
    res.send("Hello Node");
})

app.listen(3000)