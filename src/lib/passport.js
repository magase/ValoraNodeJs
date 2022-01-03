/* 
 * =====================================
 * =  Este archivo no se usa para nada =
 * =====================================
 */

const passport = require ('passport')
const LocalStrategy = require ('passport-local').Strategy
const pool = require ('../database')
const helpers = require ('../lib/helpers')

passport.use ('local.signin', new LocalStrategy ({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, async (req, email, password, done) => {
	// console.log (req.body)
	const rows = await pool.query ('SELECT * FROM tbl_usuarios WHERE email = ?', [email])
	if (rows.length > 0) {
		const user = rows [0]
		const validPassword = await helpers.matchPassword (password, user.password)
		if (validPassword) {
			done (null, user, req.flash ('success', `Bienvenido ${user.nombre_usuario}`))
		} else {
			done (null, false, req.flash ('message', 'Contraseña incorrecta'))
		}
	} else {
		return done (null, false, req.flash ('message', 'El usuario no existe'))
	}
}))

passport.use ('local.signup', new LocalStrategy ({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, async (req, email, password, done) => {
	const { nombre_usuario } = req.body
	const newUser = {
		email,
		password,
		nombre_usuario
	}
	newUser.password = await helpers.encryptPassword (password)
	const result = await pool.query ('INSERT INTO tbl_usuarios set ?', [newUser])
	newUser.id = result.insertId
	return done (null, newUser)

}))

passport.serializeUser ((user, done) => {
	done (null, user.id)
})

passport.deserializeUser (async (id, done) => {
		const rows = await pool.query ('SELECT * FROM tbl_usuarios WHERE id = ?', [id])
		done (null, rows [0])
})
