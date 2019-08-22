// supprimer un article (portfolio)

const article = require('../database/models/article')

module.exports = (req, res) => {

    article.findByIdAndRemove({ _id: req.params.id }).then(function (article) { })
    res.redirect('/portfolio');

}
