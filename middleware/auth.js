// authentification utilisateur

const user = require('../database/models/user')

module.exports = (req, res, next) => {

    // connexion dans la base de donnée
    user.findById(req.session.userId, (error, user) => {

        if(error || !user) {
            return res.redirect('/')
        }

        next()

    })

    // vérification utilisateur

    // si existant dans la base de donnée ...

    // sinon redirection

}