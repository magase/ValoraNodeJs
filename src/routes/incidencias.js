const express = require('express') 
const router = express.Router()
const multer  = require('multer')

const pool = require('../database');
const {isLoggedIn, isNotLoggedIn} = require('../lib/auth');

router.get('/add',  isLoggedIn, (req, res) =>{
   res.render('incidencias/add')
   //res.send('Form')

});

router.post('/add', isLoggedIn, async(req, res) =>{
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
    const newIncidencia = {
        usuario_creador: req.user.nombre_usuario,
        categoria_incidencia,
        nombre_incidencia,
        prioridad_incidencia,
        estado_incidencia: "Abierta", 
        descripcion,
    };
    await pool.query(`INSERT INTO tbl_incidencias set ?`, [newIncidencia]);
    console.log(req.file);
    req.flash('success', 'Incidencia creada correctamente')
    res.redirect('/incidencias');
})

router.get('/', isLoggedIn, async(req, res) =>{
    const incidencias = await pool.query('SELECT * FROM tbl_incidencias')
    console.log(incidencias)
    res.render('incidencias/list', { incidencias });
})

router.get('/delete/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM tbl_incidencias where id = ?', [id]);
    req.flash('success', 'Incidencia borrada')
    res.redirect('/incidencias');
});

router.get('/edit/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const incidencia = await pool.query('SELECT * FROM tbl_incidencias WHERE id = ?', [id]);
    //console.log(incidencia[0])
    res.render('incidencias/edit', { incidencias: incidencia[0]  });
});

router.post('/edit/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const { categoria_incidencia, nombre_incidencia, prioridad_incidencia, estado_incidencia, descripcion } = req.body;
    const newIncidencia = {
        categoria_incidencia,
        nombre_incidencia,
        prioridad_incidencia,
        estado_incidencia, 
        descripcion
    };
    await pool.query('UPDATE tbl_incidencias set ? WHERE id = ?', [newIncidencia, id]);
    req.flash('success', 'Incidencia actualizada')
    res.redirect('/incidencias');
});


module.exports = router