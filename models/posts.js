const marked = require('marked');
const Post = require('../lib/mongo').Post

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
    }
}