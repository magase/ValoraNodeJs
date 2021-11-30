const express = require('express') 
const router = express.Router()
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');
const multer  = require('multer')
const path = require('path');
const fs = require('fs');

//const pool = require('../database');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename:  (req, file, cb) => {
        cb(null, file.originalname);
    }
})
const uploadImage = multer({
    storage,
    limits: {fileSize: 1000000}
}).single('image');
  
router.get('/', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
})


const upload = multer({
    storage,
    dest: path.join(__dirname, 'public/uploads')
}).single('file');

router.get('/add',upload, (req, res) =>{
    console.log(req.files)
    res.send('Upload')
})


module.exports = router