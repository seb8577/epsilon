// création d'un utilisateur/user

const bcrypt = require('bcrypt')

// importation de mongoose
const mongoose = require('mongoose')

// base de donnée
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Le nom est obligatoire"]
    },

    email: {
        type: String,
        required: [true, "L' adresse mail est obligatoire"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "Le password est obligatoire"]
    },

    admin: {
        type: Boolean, default: false
    }

})

// récupération des données(this = name + email + password) puis cryptage du password
userSchema.pre('save', function (next) {

    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted) => {
        user.password = encrypted
        next()
    })

})

// exportation d'un utilisateur/user
module.exports = mongoose.model('user', userSchema)