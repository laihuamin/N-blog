// 这个模块是用来做登录验证的
module.exports = {
    checkLogin: checkLogin = (req, res, next) => {
        if (!req.session.user) {
            req.flash('error', '未登录')
            return res.redirect('/signin')
        }
        next()
    },
    checkNotLogin: checkNotLogin = (req, res, next) => {
        if(req.session.user) {
            req.flash('error', '已登录')
            return res.redirect('back')
        }
        next()
    }
}