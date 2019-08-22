// récuperer un utilisateur et l'afficher dans le dashboard

const user = require('../database/models/user')

module.exports      = async (req, res) => {

    const dbUsers   = await user.find({}),
        dbAdmin     = await user.find({ admin: true }),
        dbSeb       = await user.find({ name: 'seb' }),
        sess        = req.session

    if (req.session.userId) {

        console.log(sess);

        return res.render(
            "dashboard", {
                dbUsers,
                dbAdmin
            })
    }
    res.redirect("/user/login")

}