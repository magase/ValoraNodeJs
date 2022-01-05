const mysql = require ('mysql')
const { promisify } = require ('util')
const { database } = require ('./keys')

const pool = mysql.createPool (database)

pool.getConnection ((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error ('La conexion con la base de datos se ha cerrado')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error ('La base de datos tiene demasiadas conexiones')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error ('La conexion con la base de datos ha sido rechazada')
    }
  }

  if(connection) {
    connection.release ()
  }
  console.log ('DB está conectada')
})
//Promesas
pool.query = promisify (pool.query)

module.exports = pool

/** 
//Crear la conextion
const conector = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "valora",
});

const conectar = () => {
  conector.connect((err) => {
    if (err) throw err;
    console.log("Conectado");
  });
};

const agregarUser = (email, password, nombreUsuario, categoriaUsuario) => {
  const sql = `INSERT INTO tbl_usuarios (id, email, password, nombre_usuario, categoria_usuario) values (${null}, "${email}", "${password}", "${nombreUsuario}", "${categoriaUsuario}")`;
  conector.query(sql, function (err, result, filed) {
    if (err) throw err;
    console.log(result);
  });
};

const agregarIncidencia = (
  usuario_creador,
  usuario_asignado,
  estado_incidencia,
  categoria_incidencia,
  fecha_creacion,
  fecha_final,
  nombre_incidencia,
  descripcion
) => {
  const sql = `INSERT INTO tbl_incidencias (id,usuario_creador,usuario_asignado,estado_incidencia,categoria_incidencia,fecha_creacion,fecha_final,nombre_incidencia,descripcion) values (${null},"${usuario_creador}","${usuario_asignado}","${estado_incidencia}","${categoria_incidencia}","${fecha_creacion}","${fecha_final}","${nombre_incidencia}","${descripcion}")`;
  conector.query(sql, function (err, result, filed) {
    if (err) throw err;
    console.log(result);
  });
};

export { conectar, agregarUser, agregarIncidencia };
*/
