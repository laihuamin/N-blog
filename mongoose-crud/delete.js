const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://127.0.0.1:27017/myblog');

db.connection.on('errpr', () => {
    console.log('数据库链接失败')
})

db.connection.on('open', () => {
    console.log('数据库链接成功')
})
// 定义shcema骨架
DescSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
})
// 根据骨架定义模型
const Desc = mongoose.model('Desc', DescSchema);

// 先删除
Desc.remove({name: 'laihuamin'}, function(err) {
    if(err) {
        throw err;
    } else {
        console.log('删除成功')
    }
})
// 如果删除成功之后，验证是否成功
Desc.find({}, function(err, doc) {
    if(err) {
        throw err;
    } else {
        console.log(doc)
    }
})