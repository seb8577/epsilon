// afficher un article dans une nouvelle page (portfolio)

const Post = require("../database/models/article")

module.exports = async (req, res) => {

    const sess = req.session
    const article = await Post.findById(req.params.id)
    
    res.render('articles', {article, sess})
}