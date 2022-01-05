const express = require ('express') 
const router = express.Router ()
const require_login = require ('../lib/auth').require_login

router.get ('/', require_login (false), (req, res) => {
    res.render ('auth/signin')
})

module.exports = router
