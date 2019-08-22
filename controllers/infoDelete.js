// supprimer un article (blog)

const info = require('../database/models/info')

module.exports = (req, res) => {

    info.findByIdAndRemove({ _id: req.params.id }).then(function (info) { })
    res.redirect('/blog');

}