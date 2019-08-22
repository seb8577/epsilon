// affiche une info de la galerie dans une nouvelle page (blog)
// modifier un article (blog)

const Edit = require ("../database/models/info");

module.exports = async (req,res) => {
    const info = await Edit.findById(req.params.id)

    res.render ('infoEdit', {info})
}