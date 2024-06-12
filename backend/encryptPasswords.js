const bcrypt = require('bcrypt'); // Importamos bcrypt para encriptar las contraseñas
const saltRounds = 10; // Definimos el número de rondas de sal para bcrypt
const mysql = require('mysql2');  //Verificar la conexión a la base de datos
require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',  // usa cadena vacía si no tiene password
  database: process.env.DB_NAME
});

async function encryptAndSavePasswords() {
  try {
    // Paso 1: Leer todas las contraseñas de la base de datos
    const users = await new Promise((resolve, reject) => {
      // Ejecutamos una consulta para obtener todos los idUsuario y contraseñas de la tabla Usuarios
      db.query('SELECT idUsuario, password FROM Usuarios', (err, results) => {
        if (err) {
          return reject(err); // Si hay un error en la consulta, rechazamos la promesa
        }
        resolve(results); // Si la consulta es exitosa, resolvemos la promesa con los resultados
      });
    });

    // Verificamos que el resultado de la consulta sea un array
    if (!Array.isArray(users)) {
      throw new Error("Error al obtener usuarios: el resultado no es un array");
    }

    // Paso 2: Encriptar cada contraseña y actualizar la base de datos
    for (let user of users) {
      // Encriptamos la contraseña del usuario
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Actualizamos la contraseña encriptada en la base de datos
      await new Promise((resolve, reject) => {
        const updateSQL = 'UPDATE Usuarios SET password = ? WHERE idUsuario = ?'; // Consulta SQL para actualizar la contraseña
        const values = [hashedPassword, user.idUsuario]; // Valores a insertar en la consulta

        // Ejecutamos la consulta de actualización
        db.query(updateSQL, values, (err, results) => {
          if (err) {
            return reject(err); // Si hay un error en la actualización, rechazamos la promesa
          }
          resolve(results); // Si la actualización es exitosa, resolvemos la promesa
        });
      });

      console.log(`Password para el usuario con el ID ${user.idUsuario} fue encriptado y actualizado.`);
    }

    console.log('Todas los password fueron encriptadas y actualizadas');
  } catch (error) {
    // Manejamos cualquier error que ocurra durante el proceso
    console.error('Error durante el proceso de encriptacion de los passwords:', error);
  } finally {
    // Cerramos la conexión a la base de datos
    db.end();
  }
}

// Ejecutamos la función para encriptar y guardar las contraseñas
encryptAndSavePasswords();
