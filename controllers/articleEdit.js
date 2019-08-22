// affiche un article de la galerie dans une nouvelle page (portfolio)
// modifier un article (portfolio)

const Edit = require ("../database/models/article");

module.exports = async (req,res) => {
    const article = await Edit.findById(req.params.id)

    res.render ('articleEdit', {article})
}





