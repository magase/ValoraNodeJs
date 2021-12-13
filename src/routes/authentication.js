const express = require('express'); 
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn, isAdmin, isAdmin1} = require('../lib/auth');


router.get('/signup', isNotLoggedIn, (req, res) =>{
    res.render('auth/signup')
})

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}))

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
})

router.post('/signin', isNotLoggedIn, (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})

router.get('/profile',  isLoggedIn, (req, res) =>{
    res.render('profile')

})

router.get('/admin',  isLoggedIn, isAdmin, (req, res) =>{
    res.render('admin')

})
router.get('/myIncidents',  isLoggedIn, isAdmin1, (req, res) =>{
    res.render('admin/myIncidents')

})



router.get('/logout', isLoggedIn, (req, res)=> {
    req.logOut();
    res.redirect('/signin')
})

module.exports = router