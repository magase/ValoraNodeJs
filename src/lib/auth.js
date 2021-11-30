const pool = require('../database');


module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()){
            
            return next();

        }
        return res.redirect('/signin');
    }, 

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    },

    isAdmin: async (req, res, next) => {
        console.log(req.user.categoria_usuario);

        if (req.user.categoria_usuario == "tecnico"){
            const incidencias = await pool.query('SELECT * FROM tbl_incidencias')
            res.render('incidencias/list', {incidencias});
            console.log('sirve')
            return next();
        } 
        console.log('no sirve')
        return res.redirect('/profile');

    }

};