const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

router.get('/', checkNotLogin, (req, res, next) => {
    res.send('注册页')
})

router.post('/', checkNotLogin, (req, res, next) => {
    res.send('注册信息')
})

module.exports = router