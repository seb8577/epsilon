// page register

// récupération du schema depuis la base de donnée
const user = require('../database/models/user')

// on utilise la methode Create pour récuperer le body(register.handlebars) et le stocker dans la base de donnée
// une fois terminée, on redirige vers la page d'accueil si il n'y a pas d'erreur(sinon on reste sur la page user create)
module.exports = (req, res) => {
    user.create(
        req.body, (error, user) => {

            if(error) {

                const registerError = Object.keys(error.errors).map(key => error.errors[key].message); // affiche un message d'erreur dans inscription
                
                req.flash('registerError', registerError)
                req.flash('data', req.body)

                return res.redirect('/user/create')
            }
        
            res.redirect('/')
        }
    )
}