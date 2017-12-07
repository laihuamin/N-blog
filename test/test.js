require('./connect');

const User = require('./use');

const use = new User({
    username: 'laihuamin',
    password: 'lhm890%%'
})

use.save((error, doc) => {
    if (error) {
        console.log('数据库储存错误' + error)
    }

    console.log('数据库储存成功' + doc)
})