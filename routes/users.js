const express = require('express')
const router = express.Router()


router.get('/:name', (req, res) => {
    res.render('users', {
        name: `Hello ${req.params.name}`
    })
})

module.exports = router