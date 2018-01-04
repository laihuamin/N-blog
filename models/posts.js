import { Promise } from 'mongoose';

const marked = require('marked')
const Post = require('../lib/mongo').Post
const CommentModel = require('./comments')

// 将post的content的markdown，转化成html
Post.plugin('contentHtml', {
    afterFind: function(posts) {
        return posts.map((item) => {
            item.content = marked(item.content);
            return item;
        })
    },
    afterFindOne: function(post) {
        if(post) {
            post.content = marked(post.content)
        }
        return post
    }
})

Post.plugin('addCommentCount', {
    afterFind: function(posts) {
        return Promise.all(posts.map(function(post) {
            return CommentModel.getCommentsCount(post._id).then(function(commentCount) {
                post.commentCount = commentCount
                return post
            })
        }))
    },
    afterFindOne: function(post) {
        if(post) {
            return CommentModel.getCommentsCount(post._id).then(function(commentCount) {
                post.commentCount = commentCount
                return post
            })
        }
        return post
    }
})

module.exports = {
    create: function create(post) {
        return Post.create(post).exec();
    },
    // 通过一篇文章的id获取文章
    getPostById: function getPostById(postId) {
        return Post.findOne({_id: postId}).populate({path: 'author', model: 'User'}).addCreatedAt().contentHtml().exec();
    },

    // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
    getPosts: function getPosts(author) {
        const query = {};
        if(author) {
            query.author = author;
        }
        return Post.find(query).populate({path: 'author', model: 'User'}).sort({_id: -1}).addCreatedAt().contentHtml().exec();
    },

    // 通过文章 id 给 pv 加 1
    incPv: function incPv(postId) {
        return Post.update({_id: postId}, {$inc: {pv: 1}}).exec();
    },

    // 通过一篇文章那到原声的文章，进行编辑
    getRawPostById: function getRawPostById(postId) {
        return Post.findOne({_id: postId}).populate({path: 'author', model: 'User'}).exec()
    },

    // 更新一篇文章
    updatePostId: function updatePostId(postId, data) {
        return Post.update({_id: postId}, {$set: data}).exec()
    },

    // 删除一篇文章

    delPostById: function delPostById(postId) {
        return Post.remove({_id: postId}).exec()
    }
}