const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.set('debug', true);

const db = mongoose.connect('mongodb://127.0.0.1:27017/myblog');

db.connection.on('error', function(error) {
    console.log(error);
})

db.connection.on('open', function() {
    console.log('数据库链接成功')
})