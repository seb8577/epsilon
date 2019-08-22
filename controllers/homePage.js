// POST

// récupération du schema depuis la base de donnée
const Post = require("../database/models/article")

// dirige vers la page homePage = accueil
module.exports = async (req,res) => {

    const Posts = await Post.find({})
    const sess = req.session
    
    res.render('index', {Posts, sess})

}
