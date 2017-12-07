const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/myblog');


db.connection.on('error', (error) => {
    console.log(`数据库连接失败${error}`)
})

db.connection.on('open', () => {
    console.log('数据库连接成功')
})