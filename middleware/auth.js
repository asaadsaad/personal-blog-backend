const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
    if (req.path === '/post/admin/login') return next();
    if (req.headers.authorization && req.headers.authorization != 'undefined') {
        // console.log('authorization: ', req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, 'shhhhh');
        req.token = decoded;
        next();
    } else {
        res.json({ error: 'ERROR' })

    }
}