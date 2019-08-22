// poster une info (blog)

const path = require('path'); // stockage photo

// récupération du schema depuis la base de donnée
const Post = require("../database/models/info")

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
                image: `/stockPhoto/${image.name}`
            }, (error, post) => {
                res.redirect('/blog')

            })
    })

}