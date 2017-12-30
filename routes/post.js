const express = require('express'),
    router = express.Router(),
    checkLogin = require('../middlewares/check').checkLogin,
    PostModels = require('../models/posts'),
    PostController = require('../controller/post');

// 主页路由
router.get('/', (req, res, next) => {
    res.send('主页')
})

// 提交发表的文章
router.post('/create', checkLogin, (req, res, next) => {
    const post = PostController(req);
    PostModels.create(post).then((result) => {
        post = result.ops[0];
        req.flash('success', '发表成功');
        res.redirect(`/posts/${post._id}`)
    }).catch(next)
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