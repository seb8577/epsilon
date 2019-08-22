// poster un article (portfolio)

// stockage photo
const path = require('path');

// récupération du schema depuis la base de donnée
const Post = require("../database/models/article")

// récuperer le contenu pour le stocker
module.exports = (req, res) => {

    // récupération des infos de l'image
    const {
        image
    } = req.files

    // chemin vers le dossier de stockage
    const uploadFile = path.resolve(__dirname, '..', 'public/stockPhoto', image.name);

    // stockage image dans le dossier et affichage dans le front
    image.mv(uploadFile, () => {

        Post.create(

            {
                ...req.body,
                author: "Sébastien Teillet",
                image: `/stockPhoto/${image.name}`
            }, (error, post) => {
                res.redirect('/portfolio')
            })
    })

}