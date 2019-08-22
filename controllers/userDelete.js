// supprime un utilisateur de la base de données

const express = require("express");
const app = express();
const user = require ("../database/models/user")

app.get("/:id", (req, res) => {
   user.findByIdAndRemove(
       req.params.id,
       { useFindAndModify: false },
       function (err) {
           if (!err) {
               req.session.destroy(() => {
                   res.clearCookie("biscuit");
                   res.redirect('/')
               })
           } else {
               res.redirect('/');
           }
       });
})

module.exports = app;
