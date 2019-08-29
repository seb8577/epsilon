const express           = require('express');               // framework pour construire des applications web
const exphbs            = require('express-handlebars');    // moteur de templating pour afficher les variables
const mongoose          = require('mongoose');              // framework entre nodejs et mongodb
const bodyParser        = require('body-parser');           // récuperer les données pour les afficher
const fileupload        = require('express-fileupload');    // upload une image
const expressSession    = require('express-session');       // donne un id à un user
const MongoStore        = require('connect-mongo');         // se connecte à la base de donnée pour y créer une session
const connectFlash      = require('connect-flash');         // gére les messages d'erreur
const { stripTags }     = require('./helpers/hbs')          // ckeditor

// CONTROLLERS
const portfolioController           = require('./controllers/portfolio')
const articlePhotoAddController     = require('./controllers/articlePhotoAdd')
const articlePostController         = require('./controllers/articlePost')
const articleSingleController       = require('./controllers/articleSingle')
const articleDeleteController       = require('./controllers/articleDelete')
const articleEditController         = require('./controllers/articleEdit')
const articleEditPostController     = require('./controllers/articleEditPost')

const blogController                = require('./controllers/blog')
const infoPhotoAdd2Controller       = require('./controllers/infoPhotoAdd2')
const infoPostController            = require('./controllers/infoPost')
const infoSingleController          = require('./controllers/infoSingle')
const infoDeleteController          = require('./controllers/infoDelete')
const infoEditController            = require('./controllers/infoEdit')
const infoEditPostController        = require('./controllers/infoEditPost')

const homePageController            = require('./controllers/homePage')

const aboutController               = require('./controllers/about')

const roadTripTznController         = require('./controllers/roadTripTzn')
const roadTripAfsController         = require('./controllers/roadTripAfs')

const userCreate                    = require('./controllers/userCreate')
const userRegister                  = require('./controllers/userRegister')
const userLogin                     = require('./controllers/userLogin')
const userLoginAuth                 = require('./controllers/userLoginAuth')
const userLogout                    = require('./controllers/userLogout')
const admin                         = require('./middleware/admin')
const dashboardController           = require('./controllers/dashboard')
const userDeleteController          = require('./controllers/userDelete')
const deleteAccountController       = require('./controllers/deleteAccount')

// mongo atlas

,  db = "mongodb+srv://seb:123@cluster0-qvnnw.mongodb.net/test?retryWrites=true&w=majority"

mongoose
    // .connect(db , { useNewUrlParser: true })
    .connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    .then(() => console.log('Connecter a MongoDB Cloud'))
    .catch(err => console.log(err));

// application pour express
const app = express();
// mongoose.connect('mongodb://localhost:27017/blog', {    // mongoose se connecte à mongodb
//     useNewUrlParser: true
// });



const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,    // réinitialisation ou non des cookies
    resave: false,              // enregistre les informations des cookies

    // enregistrer une session d'un utilisateur dans la base de donnée
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(fileupload())

// authentification utilisateur
const auth = require("./middleware/auth")
// redirection utilisateur
const redirectAuthSuccess = require("./middleware/redirectAuthSuccess")

// Date
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

app.use(express.static('public')); // servir des fichiers statiques dans express(dossier ressources)

// ROUTES
// main = squelette du site
app.engine('handlebars', exphbs({
    helpers: {
        stripTags: stripTags
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    next()
})



// MIDDLEWARE PORTFOLIO
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articlePhoto/post", articleValidPost)
app.use("/article/add", auth)

// MIDDLEWARE BLOG
const infoValidPost = require('./middleware/infoValidPost')
app.use("/blogInfo/post", infoValidPost)
app.use("/info/add2", auth)



// ADMIN
app.use("*", admin)

// dirige vers la page dashboard
app.get("/dashboard", dashboardController)



// USERS
// dirige vers la page USERCREATE
app.get("/user/create", redirectAuthSuccess, userCreate)
app.post("/user/register", redirectAuthSuccess, userRegister)

// dirige vers la page USERLOGIN
app.get("/user/login", redirectAuthSuccess, userLogin)
app.post("/user/loginAuth", redirectAuthSuccess, userLoginAuth)

// dirige vers la page USERLOGOUT
app.get("/user/logout", userLogout)

// dirige vers la page USERDELETE
app.use("/user-delete", userDeleteController)



// dirige vers la page INDEX
app.get("/", homePageController)

// dirige vers la page PORTRAIT
app.get("/about", aboutController)

// ROAD TRIP
// dirige vers la page map tanzanie
app.get("/mapTzn", roadTripTznController)

// dirige vers la page map afrique du sud
app.get("/mapAfs", roadTripAfsController)

// dirige vers la page DELETEACCOUNT (supprimer son compte utilisateur)
app.get("/deleteAccount", deleteAccountController)



// dirige vers la page PORTFOLIO
// la page portfolio se synchronise avec la base de données
app.get('/portfolio', portfolioController)

// dirige vers la page articlePost(création article portfolio)
app.get("/articlePhoto/add", auth, articlePhotoAddController)

// récuperer le contenu pour le stocker
app.post("/articlePhoto/post", auth, articleValidPost, articlePostController)

// affiche un article du portfolio dans une nouvelle page
app.get('/articles/:id', articleSingleController)

// supprimer un article du portfolio
app.get('/article-delete/:id', articleDeleteController)

// modifier un article du portfolio
app.get('/articleEdit/:id', articleEditController)

// publier un article modifié du portfolio
app.post("/article-edit/:id", articleEditPostController)



// dirige vers la page espace BLOG
// la page espace blog se synchronise avec la base de données
app.get('/blog', blogController)

// dirige vers la page blogPhoto(création article blog)
app.get("/infoPhoto/add2", infoPhotoAdd2Controller)

// récuperer le contenu pour le stocker
app.post("/infoPhoto/post", infoPostController)

// affiche un article du portfolio dans une nouvelle page
app.get('/infos/:id', infoSingleController)

// supprimer un article du blog
app.get('/info-delete/:id', infoDeleteController)

// modifier un article du blog
app.get('/infoEdit/:id', infoEditController)

// publier un article modifié du blog
app.post("/info-edit/:id", infoEditPostController)



// dirige vers la page 404
app.use((req, res) => {
    res.render('error404')
})




// SERVEUR //
app.listen(3000, () => {
    console.log("le serveur tourne sur le port 3000");
})
