// dirige vers la page roadTripAfs

module.exports = (req, res) => {

    const sess = req.session

    if(req.session.userId) {
        return res.render("mapAfs", {sess})
    }
    res.redirect("/user/login")

    //res.render('mapAfs')
}