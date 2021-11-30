module.exports = {
    isLoggedIn (req, res, next) {
        console.log(req.body)
        if (req.isAuthenticated() && req.user.nombre_usuario == req.user.nombre_usuario){
            
            return next();

        }
        return res.redirect('/signin');
    }, 

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
};