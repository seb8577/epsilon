// dirige vers la page portrait

module.exports = (req, res) => {

    const sess = req.session

    if(req.session.userId) {

        return res.render("about", {sess})

    }
    
    res.redirect("/user/login")

}