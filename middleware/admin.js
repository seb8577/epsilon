// création d'un admin

const user = require('../database/models/user');

module.exports = (req, res, next) => {
    user.findById(req.session.userId, (err, user) => {

        if (err) {

        }
        if (user) {
            if (user.admin) {
                res.locals.admin = true;
            }
        }
        next()
    })

}