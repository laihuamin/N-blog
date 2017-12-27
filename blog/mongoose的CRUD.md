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

### read

对于read操作来说，前面到定义model的步骤都是一致的，后面的会有所差别。

```js
Desc.find({}, function(err, docs) {
    ...
})
```
对于find方法来说，第一个是定义条件，第二个是回调函数。

```js
// findById方法

Desc.findById("5a4051e176253c03070a392c", function(err, doc) {
    if(err) {
        throw err;
    } else {
        console.log(doc);
    }
})
```
这是findById可以通过id查找

```js

Desc.findOne({name: 'laihuamin'}, function(err, doc) {
    if(err) {
        throw err;
    } else {
        console.log(doc);
    }
})
```
上面是查找一个的方法findOne
### update

在update过程中，前几个步骤流程不会变，但是细节会变比如：定义骨架的时候，你要把更新的哪个字段的类型写进去。比如：
我想增加一个电话号码：
先定义骨架，把想要的字段定义进去。
```js
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
```

定义骨架完成之后的操作都不变，使用update方法，我们就可以实现更新操作:

```js
// 更新数据库中的数据

Desc.update({name: 'laihuamin'}, {phone:'137........'}, function(error) {
    if(error) {
        throw error;
    } else {
        console.log('数据更新成功')
    }
})
```

### dalete

关于delete方法，其实前面的步骤都一样.

```js
Desc.remove({name: 'laihuamin'}, function(err) {
    if(err) {
        throw err;
    } else {
        console.log('删除成功')
    }
})
```

### 结束语
到这里mongoose的crud都完成了