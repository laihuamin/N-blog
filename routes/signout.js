const express = require('express')
const router =  express.Router()

const checkLogin = require('../middlewares/check').checkLogin

router.get('/', checkLogin, (req, res, next) => {
    res.send('登出')
})

module.exports = router