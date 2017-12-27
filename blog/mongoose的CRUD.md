### 前言
所谓的CURD就是，create、update、retrieve、delete，也就是数据库的操作，我们这里要用mongoose来实现。
[mogoose文档英文](http://mongoosejs.com/docs/models.html)

### create
在test目录下创建create.js文件，然后我们进行以下5步：

1.链接数据库

```js
const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://127.0.0.1:27017/myblog');

db.connection.on('errpr', () => {
    console.log('数据库链接失败')
})

db.connection.on('open', () => {
    console.log('数据库链接成功')
})
```

2.定义schema骨架

```js
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
```

3.创建模型

```js
const Desc = mongoose.model('Desc', DescSchema);
```

4.创建实例

```js
const myDesc = new Desc({
    name: 'laihuamin',
    desc: 'smart'
})
```

5.存入数据库操作

```js
myDesc.save(function(err) {
    if(err) {
        throw err;
    } else {
        console.log('success')
    }
})
```

### delete

### read

对于read操作来说，前面到定义model的步骤都是一致的，后面的会有所差别。

```js
Desc.find({}, function(err, docs) {
    ...
})
```
对于find方法来说，第一个是定义条件，第二个是回调函数。

```js

```
