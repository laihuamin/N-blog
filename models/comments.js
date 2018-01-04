const marked = require('marked')
const Comment = require('../lib/mongo').Comment

Comment.plugin('commentHtml', {
    afterFind: function (comments) {
        return comments.map(function(comment) {
            comment.content = marked(comment.content)
            return comment
        })
    }
})

module.exports = {
    // 创建一个留言
    create: function create(comment) {
        return Comment.create(comment).exec()
    },
    // 通过留言 id 获取一个留言
    getCommentById: function getCommentById(commentId) {
        return Comment.findOne({_id: commentId}).exec()
    },
    // 通过留言 id 删除一个留言
    delCommentById: function delCommentById(commentId) {
        return Comment.remove({_id: commentId}).exec()
    },
    // 通过文章 id 删除该文章下所有留言
    delCommentByPostId: function delCommentByPostId(postId) {
        return Comment.remove({postId: postId}).exec()
    },
    // 通过文章 id 获取该文章下所有留言，按留言创建时间升序
    getByPostId: function getByPostId(postId) {
        return Comment.find({postId: postId}).populate({path: 'author', model: 'User'}).sort({_id: 1}).addCreatedAt().commentHtml().exec()
    },
    // 通过文章 id 获取该文章下留言数
    getCommentsCount: function getCommentsCount(postId) {
        return Comment.count({postId: postId}).exec()
    }
}