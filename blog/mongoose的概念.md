### 概念

结合前面一片示例，我们总结4个核心概念：

- ORM对象关系映射
- Schema
- Model模型
- Entity实体

### ORM对象关系映射

mongoose包括以下四部分：

- 一个对持久类对象进行CRUD操作的API，可以理解为实体Entity上的方法
- 一个语言或API用来规定与类和类属性相关的查询，比如Population
- 一个规定MAPPING METADATA的工具，可以理解为Schema定义
- 一种技术可以让ORM的实现各种db操作的封装

### Schema

Schema是一种文件形式储存的数据库模型骨架。——简单理解就行对文档结构的定义

基本类型有：字符串、日期型、数值型、布尔型、null、数组、内嵌文档等

### model

model是由Schema构造生成的模型。

model是怎么映射的呢，我们看下面的示例：
```js
const db = mongoose.connect("mongodb://127.0.0.1:27017/test");  
// 创建Model 
const TestModel = db.model("test1", TestSchema);


// 定义Model
const UserModel = mongoose.model('User', UserSchema);
```

User就是model的名称，也就是数据库中集合的名称。

### Entity

Entity是model创建的实体。使用save方法保存到数据库中。

### 总结

schema是骨架，model是模型，entity是实例