// dirige vers la page logout

module.exports = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}