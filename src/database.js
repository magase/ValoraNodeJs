const mysql = require("mysql");
const { promisify } = require('util')
const { database } = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("La conexion con la base de datos se ha cerrado");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("La base de datos tiene demasiadas conexiones");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("La conexion con la base de datos ha sido rechazada");
    }
  }

  if(connection) connection.release()
    console.log('DB está conectada')
  return;
  
});
//Promesas
pool.query = promisify(pool.query);

module.exports = pool


