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
    },
    phone: {
        type: String,
        required: true
    }
})
// 根据骨架定义模型
const Desc = mongoose.model('Desc', DescSchema);

// 更新数据库中的数据

Desc.update({name: 'laihuamin'}, {phone:'137........'}, function(error) {
    if(error) {
        throw error;
    } else {
        console.log('数据更新成功')
    }
})