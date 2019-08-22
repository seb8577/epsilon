// création d'un article avec photo dans portfolio

// importation de mongoose
const mongoose = require('mongoose')

// base de donnée
const articleSchema = new mongoose.Schema({

    image: String,
    title: String,
    content: String,
    information: String,
    createDate: {
        type: Date,
        default: new Date()
    },
    author: String,

})

// model pour mettre les informations dans la base de donnée
const article = mongoose.model('article', articleSchema)

// exportation d'un article
module.exports = article
