module.exports = {
    // 监听的端口
    port: 3000,
    // session的设置
    session: {
        serect: 'myblog',
        key: 'myblog',
        maxAge: 2592000000
    },
    // mongodb的路径设置
    mongodb: 'mongodb://localhost:27017/myblog'
}