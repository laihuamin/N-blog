import { Post } from '../lib/mongo';
import { Promise } from 'mongoose';

const express = require('express'),
    router = express.Router(),
    checkLogin = require('../middlewares/check').checkLogin,
    PostModels = require('../models/posts'),
    PostController = require('../controller/post'),
    CommentsModels = require('../models/comments');

// 主页路由
router.get('/', (req, res, next) => {
    const author = req.query.author;
    Post.getPosts(author).then(function(post){
        reset.render('posts', {
            post: posts
        })
    }).catch(next)
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
    const postId = req.query.postId;

    Promise.all([
        PostModels.getPostById(postId),
        CommentsModels.delCommentByPostId(postId),
        PostModels.incPv(postId)
    ]).then(function(result) {
        const post = result[0];
        const comments = result[1];
        if(!post) {
            throw Error('该文章不存在')
        }
        res.render('post', {
            post,
            comments
        })
    }).catch(next)
})

// 编辑具体的某一篇文章
router.get('/:postId/edit', checkLogin, (req, res, next) => {
    const postId = req.params.postId,
        author = req.session.user._id;
    return Post.getRawPostById(postId).then(function(post) {
        if(!post) {
            throw new Error('该文章不存在')
        }
        if(author.toString() !== post.author._id.toString()) {
            throw new Error('权限不够')
        }
        res.render('edit', {
            post: post
        })
    }).catch(next)
})

// 更新文章的页面
router.post('/:postId/edit', checkLogin, (req, res, next) => {
    const postId = req.params.postId,
        author = req.session.user._id,
        title = req.fields.title,
        content = req.fields.content;

    try{
        if(!title) {
            throw new Error('请填写标题')
        }
        if(!content) {
            throw new Error('请填写内容')
        }
    }catch(e) {
        req.flash('error', e.message)
        return reset.redirect('back')
    }

    PostModels.updatePostId(postId, {title: title, content: content}).then(function() {
        req.flash('success', '编辑文章成功')
        res.redirect(`/posts/${postId}`)
    }).catch(next)
})

// 删除文章的页面
router.get('/:postId/remove', checkLogin, (req, res, next) => {
    const postId = req.params.postId,
        author = req.session.user._id;
    return Post.getRawPostById(postId).then(function(post) {
        if(!post) {
            throw new Error('该文章不存在')
        }
        if(author.toString() !== post.author._id.toString()) {
            throw new Error('权限不够')
        }
        PostModels.delPostById(postId).then(function(){
            req.flash('success', '删除文章成功')
            reset.redirect('/posts')
        })
    }).catch(next)
})

module.exports = router