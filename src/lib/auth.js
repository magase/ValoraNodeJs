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
            return res.render('admin', {incidencias});
        } else{

        console.log('no sirve')
        return res.redirect('/profile');
    }    
},

isAdmin1: async (req, res, next) => {
    console.log(req.user.categoria_usuario);

    if (req.user.categoria_usuario == "tecnico"){
        const usuario_asignado = req.user.nombre_usuario
        console.log(usuario_asignado);
        const incidencias = await pool.query('SELECT * FROM tbl_incidencias WHERE usuario_asignado = ?', [usuario_asignado]);
        return res.render('myIncidents', {incidencias});
    } else{

    console.log('no sirv4e')
    return res.redirect('/profile');
}
}

    

};