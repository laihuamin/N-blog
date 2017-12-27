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

// find方法查询

Desc.find({}, function(err, doc) {
    if(err){
        throw err;
    } else {
        console.log(doc);
    }
})

// findById方法

Desc.findById("5a4051e176253c03070a392c", function(err, doc) {
    if(err) {
        throw err;
    } else {
        console.log(doc);
    }
})

Desc.findOne({name: 'laihuamin'}, function(err, doc) {
    if(err) {
        throw err;
    } else {
        console.log(doc);
    }
})