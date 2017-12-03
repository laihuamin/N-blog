
module.exports = (app) => {
    app.use('/', (req, res) => {
        res.redirect('/post')
    })
    app.use('/signin', require('./signin'))
    app.use('/signout', require('./signout'))
    app.use('/singup', require('./signup'))
    app.use('/post', require('./post'))
    app.use('/comments', require('./comments'))
}