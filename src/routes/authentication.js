const express = require ('express')
const router = express.Router ()
const passport = require ('passport')
const { require_login, isLoggedIn, isNotLoggedIn, isAdmin, isAdmin1 } = require ('../lib/auth')

router.get ('/signup', require_login (false), (req, res) => {
	res.render ('auth/signup')
})

router.post ('/signup', require_login (false), passport.authenticate ('local.signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
	failureFlash: true
}))

router.get ('/signin', require_login (false), (req, res) => {
	res.render ('auth/signin')
})

router.post ('/signin', require_login (false), (req, res, next) => {
	passport.authenticate ('local.signin', {
		successRedirect: '/profile',
		failureRedirect: '/signin',
		failureFlash: true
	})(req, res, next)
})

router.get ('/profile',  require_login (true), (req, res) => {
	res.render ('profile')
})

router.get ('/admin',  require_login (true), isAdmin, (req, res) => {
	res.render ('admin')
})

router.get ('/myIncidents', require_login (true), isAdmin1, (req, res) => {
	res.render ('admin/myIncidents')
})

router.get ('/logout', require_login (true), (req, res) => {
	req.logOut ()
	res.redirect ('/signin')
})

module.exports = router