// publier un article modifié (portfolio)

const path = require('path')

const article = require('../database/models/article')

module.exports = (req, res) => {

    let query = {
        _id: req.params.id
    }
    const {
        image
    } = req.files

    const uploadFile = path.resolve(__dirname, '..', 'public/stockPhoto', image.name);
    image.mv(uploadFile, (error) => {

        article.findOneAndUpdate(query,

            {
                ...req.body,
                author: "Sébastien Teillet",
                image: `/stockPhoto/${image.name}`
            },

            function (error, post) {
                if (error) {
                    return;
                } else {
                    res.redirect('/portfolio');
                }
            });
    })
};