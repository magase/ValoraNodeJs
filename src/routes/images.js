const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { ExpressHandlebars } = require('express-handlebars');
const upload = multer({dest: 'public/images'});

const app = express();

app.set('views', path.join(__dirname,'edit-profile-image' ));
app.set('edit-profile-image engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/edit-profile-image', (req, res) =>{
    res.render('edit-profile-image')

})

module.exports = app