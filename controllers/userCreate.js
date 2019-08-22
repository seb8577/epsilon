// dirige vers la page register

module.exports = (req, res) => {
    
    res.render("register", {

        errors : req.flash('registerError'),    // affiche un message d'erreur dans le front de la page inscription
        data : req.flash('data') [0]              
    })
}