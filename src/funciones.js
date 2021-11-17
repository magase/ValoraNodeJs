const email = document.querySelector('#email')
const password = document.querySelector('#password')
const nombreUsuario = document.querySelector('#nombreUsuario')
const categoriaUsuario = document.querySelector('#categoriaUsuario')
const usuario_creador = document.querySelector('#usuario_creador')
const usuario_asignado = document.querySelector('#usuario_asignado')
const estado_incidencia = document.querySelector('#estado_incidencia')
const categoria_incidencia = document.querySelector('#categoria_incidencia')
const fecha_creación = document.querySelector('#fecha_creación')
const fecha_final = document.querySelector('#fecha_final')
const nombre_incidencia = document.querySelector('#nombre_incidencia')
const descripcion = document.querySelector('#descripcion')

const btnSignUp = document.querySelector('#btn_signup')
const btnCrearIncidencia = document.querySelector('#btn_crearIncidencia')

btnSignUp.addEventListener('click', function(){
    window.location.href = `signup/${email.value}/${nombreUsuario.value}/${categoriaUsuario.value}`
})

btnCrearIncidencia.addEventListener('click', function(){
    window.location.href = `incidencias/${usuario_creador.value}/${usuario_asignado.value}/${estado_incidencia.value}/${categoria_incidencia.value}/${fecha_creación.value}/${fecha_final.value}/${nombre_incidencia.value}/${descripcion.value}`
})

