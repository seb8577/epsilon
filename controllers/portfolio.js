// POST

const Post = require("../database/models/article")

// dirige vers la page portfolio

// la page portfolio se synchronise avec la base de donnée
module.exports = async (req, res) => {

    const sess = req.session
    const posts = await Post.find({}) // passe en objet le contenu de la collection article.js

    if(req.session.userId) {
        return res.render("portfolio", {posts, sess})
    }
    res.redirect("/user/login")

    //res.render('portfolio', {posts}) // affiche dans la page portfolio

}