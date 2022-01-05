const express = require ('express') 
const router = express.Router ()

const pool = require ('../database')
const require_login = require ('../lib/auth').require_login
const isAdmin = require ('../lib/auth').isAdmin

router.get ('/add',  require_login (true), (req, res) => {
   res.render ('incidencias/add')
})

router.get ('/pendiente', require_login (true), async (req, res) => {
    const usuario  = req.user.nombre_usuario
    console.log ("Usuario: ", usuario)
    const incidencias = await pool.query ('SELECT * FROM tbl_incidencias where estado_incidencia="Pendiente" AND  usuario_creador = ?', [usuario])
    res.render ('incidencias/list', { incidencias })
    console.log (incidencias) 
})

router.get ('/abierta', require_login (true), async (req, res) => {
    const usuario = req.user.nombre_usuario
    console.log ("Usuario: ", usuario)
    const incidencias = await pool.query ('SELECT * FROM tbl_incidencias where estado_incidencia="Abierta" AND usuario_creador = ? ;', [usuario])
    res.render('incidencias/list', { incidencias })
})

router.get ('/cerrada', require_login (true), async (req, res) => {
    const usuario  = req.user.nombre_usuario
    console.log ("Usuario: ", usuario)
    const incidencias = await pool.query ('SELECT * FROM tbl_incidencias where estado_incidencia="Cerrada" AND usuario_creador = ? ;', [usuario])
    res.render ('incidencias/list', { incidencias })
})

router.post ('/add', require_login (true), async (req, res) => {
    //Destructuracion del los elementos traidos por req
    const { usuario_creador,
        usuario_asignado,
        estado_incidencia,
        prioridad_incidencia,
        categoria_incidencia,
        fecha_creacion,
        fecha_final,
        nombre_incidencia, 
        descripcion } = req.body

    //Creacion de la variable con los datos para la query
    //const newIncidencia = {
    //    usuario_creador,
    //    usuario_asignado,
    //    estado_incidencia,
    //    categoria_incidencia,
    //    fecha_creacion,
    //    fecha_final,
    //    nombre_incidencia, 
    //    descripcion,
    //};
    const newIncidencia = {
        usuario_creador,
        categoria_incidencia,
        nombre_incidencia,
        prioridad_incidencia,
        estado_incidencia, 
        descripcion,
    }
    //await pool.query(`INSERT INTO tbl_incidencias (id,usuario_creador,usuario_asignado,estado_incidencia,categoria_incidencia,fecha_creacion,fecha_final,nombre_incidencia,descripcion) values (${null},"${usuario_creador}","${usuario_asignado}","${estado_incidencia}","${categoria_incidencia}","${fecha_creacion}","${fecha_final}","${nombre_incidencia}","${descripcion}")`);
    await pool.query (`INSERT INTO tbl_incidencias set ?`, [newIncidencia])
    req.flash ('success', 'Incidencia creada correctamente')
    res.redirect ('/incidencias/'+usuario_creador)
})

router.get ('/:usuario', require_login (true), async(req, res) =>{
    const { usuario } = req.params
    console.log (usuario)
    const incidencias = await pool.query('SELECT * FROM tbl_incidencias where usuario_creador = ?', [usuario])
    // console.log(incidencias)
    // console.log(req.params.usuario)
    res.render('incidencias/list', { incidencias })
})

router.get ('/assign/:id', require_login (true), async (req, res) => {
    const usuario_asignado = req.user.nombre_usuario
    console.log (usuario_asignado)
    const { id } = req.params
    await pool.query ('UPDATE tbl_incidencias SET usuario_asignado = ? WHERE id = ?', [usuario_asignado, id])
    req.flash ('success', 'Incidencia asignada')
    res.redirect ('/myIncidents')
})

router.get ('/delete/:id', require_login (true), async (req, res) => {
    const usuario_creador = req.user.nombre_usuario
    console.log (usuario_creador)
    const { id } = req.params
    await pool.query ('DELETE FROM tbl_incidencias where id = ?', [id])
    req.flash ('success', 'Incidencia borrada')
    res.redirect ('/incidencias/' + usuario_creador)
})

router.get ('/edit/:id', require_login (true), async (req, res) => {
    const { id } = req.params
    const incidencia = await pool.query ('SELECT * FROM tbl_incidencias WHERE id = ?', [id])
    //console.log(incidencia[0])
    res.render ('incidencias/edit', { incidencias: incidencia[0] })
})

router.post ('/edit/:id', require_login (true), async (req, res) => {
    const { id } = req.params
    const { usuario_creador, categoria_incidencia, nombre_incidencia, prioridad_incidencia, estado_incidencia, descripcion } = req.body
    const newIncidencia = {
        usuario_creador,
        categoria_incidencia,
        categoria_incidencia,
        prioridad_incidencia,
        estado_incidencia, 
        descripcion
    }
    const usuario = req.user.nombre_usuario
    console.log (usuario_creador)
    await pool.query ('UPDATE tbl_incidencias set ? WHERE id = ?', [newIncidencia, id])
    req.flash ('success', 'Incidencia actualizada')
    res.redirect ('/incidencias/' + usuario)
})

module.exports = router
