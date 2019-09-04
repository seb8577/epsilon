// dirige vers la page logout

module.exports = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("biscuit");
        res.redirect('/')
    })
}