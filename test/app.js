require('./mongo-db.js');

const express = require('express');
const mongoose = require('mongoose');
const Desc = require('./mongo-db.js').Desc;
const app = new express();

app.use(express.static('./'));

app.get('/cearte', function(err) {
    if (err) {
        throw err;
    }
    console.log('create');
    const myDsec = new Desc({
        name: 'laihuamin',
        desc: 'smart',
        id: 1
    })

    myDsec.save(function(err) {
        if(err) {
            throw err
        } else {
            console.log('存入成功')
        }
    })
    res.send('存入成功')
})

app.get('/read', function(err) {
    if(err) {
        throw err;
    }

    console.log('开始读取')

    Desc.find({}, function(err, doc) {
        if(err) {
            throw err;
        } else {
            console.log(doc);
        }
    })
    res.send('读取成功')
})

app.get('/readOne', function (err) {
    if(err) {
        throw err;
    }

    console.log('开始读取单值');

    Desc.findOne({}, function(err, doc){
        if(err) {
            throw err;
        } else {
            console.log(doc)
        }
    })
    res.send('读取单值成功')
})

app.get('/update', function(err){
    if (err) {
        throw err;
    }
    console.log('开始更新');
    Desc.update({
        name: 'wangnan'
    }, {
        id: 1,
        desc: 'smart'
    }, function(error) {
        if (error) {
            throw error
        } else {
            console.log('更新成功')
        }
    })

    res.send('更新成功');
})

app.get('/delete', function(err) {
    if(err) {
        throw err;
    }
    console.log('开始删除');
    Desc.remove({
        name: 'wangnan'
    }, function(err) {
        if(err) {
            throw err
        } else {
            console.log('删除成功')
        }
    })
    res.send('删除成功')
})

app.listen(3001, function() {
    console.log('start server')
})