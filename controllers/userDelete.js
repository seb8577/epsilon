// supprimer un utilisateur de la base de données en tant qu'admin

const express = require("express");
const app = express();
const user = require ("../database/models/user")

app.get("/:id", (req, res) => {
   user.findByIdAndRemove(
       req.params.id,
       { useFindAndModify: false },
       function (err) {
           if (!err) {
                   res.redirect('/dashboard')
           } else {
               res.redirect('/');
           }
       });
})

module.exports = app;
