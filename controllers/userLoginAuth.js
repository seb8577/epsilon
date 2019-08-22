// authentification du login

const bcrypt = require('bcrypt')

// récupération du schema depuis la base de donnée
const user = require('../database/models/user')

// on récupere l'email et le password puis on les compare à la base de donnée
// l'email est comparé au user
// si le password est bon on redirige vers l'accueil sinon on reste sur la page login
module.exports = (req, res) => {

    const{email, password} = req.body
    const sess = req.session

    user.findOne({email}, (error, user) => {
        if(user) {

            // redirige vers la page d'accueil une fois connecté et identifié
            bcrypt.compare(password, user.password, (error, same) => {
                if(same) {

                    req.session.userId = user._id
                    req.session.name = user.name
                    
                    res.redirect('/')
                }
    
                else {
                    res.redirect('/user/login')
                }
            })

        } else {
            return res.redirect('/user/login')
        }
    })

}