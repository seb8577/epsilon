// POST

const Post = require("../database/models/info")

// dirige vers la page blog

// la page portfolio se synchronise avec la base de donnée
module.exports = async (req, res) => {

    const sess = req.session
    const posts = await Post.find({}) // passe en objet le contenu de la collection info.js

    if(req.session.userId) {
        return res.render("blog", {posts, sess})
    }
    res.redirect("/user/login")

    //res.render('blog', {posts}) // affiche dans la page blog

}