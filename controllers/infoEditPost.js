// publier un article modifié (blog)

const path = require('path')

const info = require('../database/models/info')

module.exports = (req, res) => {

    let query = {
        _id: req.params.id
    }
    const {
        image
    } = req.files

    const uploadFile = path.resolve(__dirname, '..', 'public/stockPhoto', image.name);
    image.mv(uploadFile, (error) => {

        info.findOneAndUpdate(query,

            {
                ...req.body,
                author: "Sébastien Teillet",
                image: `/stockPhoto/${image.name}`
            },

            function (error, post) {
                if (error) {
                    return;
                } else {
                    res.redirect('/blog');
                }
            });
    })
};