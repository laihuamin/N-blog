// 这是一个连接mongodb的例子

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myblog');

var Cat = mongoose.model('Cat', {name: String})

var kitty = new Cat({name: 'laihuamin'})

kitty.save(function(err) {
    if(err){
        console.log(err);
    }else {
        console.log('success')
    }
})