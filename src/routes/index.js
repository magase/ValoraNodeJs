const express = require('express') 
const router = express.Router()
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

//const pool = require('../database');
router.get('/', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
})


module.exports = router