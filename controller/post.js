// 这个文件是控制post行为的业务逻辑代码

const postController = (req) => {
    const author = req.author,
        title = req.title,
        content = req.content;
    try {
        if (!title.length) {
            throw Error('请书写标题')
        }
        if (!content.length) {
            throw Error('请书写内容')
        }
    } catch (e) {
        req.flash('error', e.message)
        return res.redirect('back')
    }
    return {
        author,
        title,
        content,
        pv: 0
    }
}

