const pool = require ('../database')

const isNotLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated ()) {
		return next ()
	}

	return res.redirect('/profile')
}

const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated ()) {
		return next ()
	}

	return res.redirect ('/signin')
}

const require_login = (required) => {
	return (required) ? isLoggedIn : isNotLoggedIn
}

const isAdmin = async (req, res, next) => {
	console.log (req.user.categoria_usuario)

	if (req.user.categoria_usuario == 'tecnico') {
		const incidencias = await pool.query ('SELECT * FROM tbl_incidencias;')
		return res.render ('admin/admin', { incidencias: incidencias })
	} else {
		console.log ('No es \'admin\'.')
		return res.redirect ('/profile')
	}    
}

const isAdmin1 = async (req, res, next) => {
	console.log (req.user.categoria_usuario)

	if (req.user.categoria_usuario == 'tecnico') {
		const usuario_asignado = req.user.nombre_usuario
		// console.log (usuario_asignado)
		const incidencias = await pool.query ('SELECT * FROM tbl_incidencias WHERE usuario_asignado = ?;', [usuario_asignado])
		return res.render ('admin/myIncidents', {incidencias})
	} else {
		console.log ('No es \'admin1\'.')
		return res.redirect ('/profile')
	}
}



module.exports = {
	require_login: require_login,

	isLoggedIn: isLoggedIn, 

	isNotLoggedIn: isNotLoggedIn,

	isAdmin: isAdmin,

	isAdmin1: isAdmin1
}
