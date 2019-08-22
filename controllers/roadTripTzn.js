// dirige vers la page roadTripTzn

module.exports = (req, res) => {

    const sess = req.session

    if(req.session.userId) {
        return res.render("mapTzn", {sess})
    }
    res.redirect("/user/login")

    //res.render('mapTzn')
}