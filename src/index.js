const express = require('express') 
const morgan = require('morgan')
const { engine } = require('express-handlebars');

const path = require('path')


const app = express();

//settings
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', 
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
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//Variables globales
app.use((req, res, next) =>{
    next();
});

//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/authentication'))
app.use('/links', require('./routes/incidencias'))

//Public
app.use(express.static(path.join(__dirname, 'public')));
