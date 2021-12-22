const express = require('express') 
const router = express.Router()

const pool = require('../database');
const {isLoggedIn, isNotLoggedIn, isAdmin} = require('../lib/auth');


router.get('/estado/1', isLoggedIn, async (req, res)=>{
    const incidencia = await pool.query('SELECT * FROM tbl_estados WHERE idEstado = 1');
    res.render('incidencias/edit', { incidencias: incidencia[0]  });
    console.log(incidencia);
});

router.post('/estado/1', isLoggedIn, async (req, res)=>{
    const { idEstado, estado } = req.params;
    const { idEstado, estado } = req.body;
    const newIncidencia = {
        idEstado,
        estado
    };
    const usuario = req.estado
    console.log(usuario_creador)
    await pool.query('UPDATE tbl_estados set ? WHERE id = ?', [newIncidencia, id]);

    req.flash('success', 'Incidencia actualizada')
    res.redirect('/incidencias/'+usuario);
});


module.exports = router