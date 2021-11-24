const incidencias = [
    {nombre: 'huio', descripcion: 'inlnlo'},
    {nombre: 'inikn', descripcion: 'ssss'},
    {nombre: 'nkl', descripcion: 'lkn'},
    {nombre: 'fg', descripcion: 'ww'},

]
const buscar = document.querySelector('#buscador');
const boton = document.querySelector('#boton_buscar');
const resultado = document.querySelector('#resultado');

const filtrar = () =>{
    // console.log(buscar.value);
    const texto = buscar.value;
    for(let incidencia of incidencias){

        let nombre = incidencia.nombre;

        if(nombre.indexOf(texto) !== -1){
            resultado.innerHTML += `
                <li> Nombre: ${incidencia.nombre}
           <br>
                    Descripcion: ${incidencia.descripcion}
                </li> 
                `
        }
    }
    if (resultado.innerHTML === ''){
        resultado.innerHTML += `
        <li> Incidencia no encontrada... </li> 
        `
    }
}

boton.addEventListener('click', filtrar)
