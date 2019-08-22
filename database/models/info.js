// création d'un article avec photo dans blog

// importation de mongoose
const mongoose = require('mongoose')

// base de donnée
const infoSchema = new mongoose.Schema({

    image: String,
    title: String,
    content: String,
    information: String,
    createDate: {
        type: Date,
        default: new Date()
    } 

})

// model pour mettre les informations dans la base de donnée
const info = mongoose.model('info', infoSchema)

// exportation d'un article
module.exports = info