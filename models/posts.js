const Post = require('../lib/mongo').Post

module.exports = {
    create: function create(post) {
        return Post.create(post).exec();
    }
}