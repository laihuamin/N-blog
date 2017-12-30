const express = require('express')
const router = express.Router()

const checkLogin = require('../middlewares/check').checkLogin

// 主页路由
router.get('/', (req, res, next) => {
    res.send('主页')
})

// 提交发表的文章
router.post('/create', checkLogin, (req, res, next) => {
    res.send('发表文章')
})

// 获得发表文章的页面
router.get('/create', checkLogin, (req, res, next) => {
    res.render('create')
})

// 具体某一篇文章的详情页
router.get('/:postId', (req, res, next) => {
    res.send('文章详情页')
})

// 编辑具体的某一篇文章
router.post('/:postId/edit', checkLogin, (req, res, next) => {
    res.send('更新文章详情页')
})

// 更新文章的页面
router.get('/:postId/edit', checkLogin, (req, res, next) => {
    res.send('更新页面')
})

// 删除文章的页面
router.get('/:postId/remove', checkLogin, (req, res, next) => {
    res.send('删除文章')
})

module.exports = router