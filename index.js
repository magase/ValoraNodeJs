import express from 'express'
import {conectar, agregarUser} from './src/mysqlConector.js'
const app = express()


//Iniciar el server
 app.listen('8000', function(){
     console.log('aplicacion iniciada en el puerto 8000')
 })

 //Configuracion de pug
 app.set('views', './view')
 app.set('view engine', 'pug')

 //Conf archivos estaticos
 app.use(express.static('./view'))
 app.use(express.static('./src'))
 app.use(express.static('./css'))


 
 //Rutas
 app.get('/', function(req, res){
    
    res.render('index', {titulo:'Valora GT'})

})
app.get('/signup/:email/:nombreUsuario/:categoriaUsuario', function(req, res){
    let email = req.params.email
    let password = req.params.password
    let nombreUsuario = req.params.nombreUsuario
    let categoriaUsuario = req.params.categoriaUsuario
    agregarUser(email, password, nombreUsuario, categoriaUsuario)
    res.redirect('/')

    console.log(email, password, nombreUsuario, categoriaUsuario)

})

app.get('incidencias/:usuario_creador.value}/:usuario_asignado.value}/:estado_incidencia.value}/:categoria_incidencia.value}', function(req, res){
    let usuario_creador = req.params.usuario_creador
    let usuario_asignado = req.params.usuario_asignado
    let estado_incidencia = req.params.estado_incidencia
    let categoria_incidencia = req.params.categoria_incidencia
    let fecha_creación = req.params.fecha_creación
    let fecha_final = req.params.fecha_final
    let nombre_incidencia = req.params.nombre_incidencia
    let descripcion = req.params.descripcion
    agregarIncidencia(usuario_creador, usuario_asignado, estado_incidencia, categoria_incidencia, fecha_creación, fecha_final, nombre_incidencia, descripcion)
    res.redirect('/')

    console.log(usuario_creador, usuario_asignado, estado_incidencia, categoria_incidencia, fecha_creación, fecha_final, nombre_incidencia, descripcion)

})

