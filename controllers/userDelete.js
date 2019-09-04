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
               console.log("1");
               res.clearCookie("biscuit");
                res.redirect('/')
           } else {
            console.log("2");
               res.redirect('/');
           }
       });
})

module.exports = app;
