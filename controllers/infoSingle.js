// afficher un article dans une nouvelle page (blog)

const Post = require("../database/models/info")

// affiche un article de la galerie blog dans une nouvelle page

module.exports = async (req, res) => {

    const sess = req.session
    const info = await Post.findById(req.params.id)
    
    res.render('infos', {info, sess})
}