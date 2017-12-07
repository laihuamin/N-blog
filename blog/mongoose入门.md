## 准备

1.安装mongoose

`npm install mongoose --save`

2.引入mongoose

`const mongoose = require('mongoose')`

3.和数据库进行连接

`const db = mongoose.connent("mongodb://user:pass@ip:port/database")`

- 说明
    - user是mongodb的用户名
    - pass是mongodb里用户名对应的密码
    - ip是mongodb服务器可以访问的ip，比如本地的是127.0.0.1
    - port的mongodb服务器可以访问的端口，默认是27017


## 测试

```js
// 这是一个连接mongodb的例子
// 引入依赖
const mongoose = require('mongoose');
// 连接mongodb
mongoose.connect('mongodb://localhost:27017/myblog');
// 通过mongoose的model定义model
var Cat = mongoose.model('Cat', {name: String})
// 通过new来实例化前面定义的model，并创建对象
var kitty = new Cat({name: 'laihuamin'})
// 执行kitty.save来保存到数据库
kitty.save(function(err) {
    if(err){
        console.log(err);
    }else {
        console.log('success')
    }
})
```
- 核心步骤说明：
    - 定义模型
    - 通过new关键字实例化模型，并创建对象
    - 执行数据库操作


## 连接数据库

连接数据库的通用格式

```js
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/myblog');


db.connection.on('error', (error) => {
    console.log(`数据库连接失败${error}`)
})

db.connection.on('open', () => {
    console.log('数据库连接成功')
})
```

## 模型定义

```js
const mongoose = require('mongoose');

UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
```

## 测试

```js
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
```