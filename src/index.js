const express = require('express') 
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')



const { database } = require('./keys')

const app = express();
require('./lib/passport')

//settings
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', 
    engine({ 
        defaultLayout: "main", 
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs',
        helpers: require('./lib/handlebars')
    })
);
app.set('view engine', '.hbs');


//Iniciar el server
 app.listen('8000', function(){
     console.log('aplicacion iniciada en el puerto 8000')
 })


//Midlewares
app.use(session({
    secret: 'manuSesion',
    resave: false,
    saveUninitialized: false, 
    store: new MySQLStore(database)
}));
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())


//Variables globales
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/authentication'));
app.use('/incidencias', require('./routes/incidencias'));

//Public 
app.use(express.static(path.join(__dirname, 'public')));
