// page supprimer son compte utilisateur

module.exports = (req, res) => {

    const sess = req.session

    if(req.session.userId) {
        return res.render("deleteAccount", {sess})
    }
    res.redirect("/user/login")

}
