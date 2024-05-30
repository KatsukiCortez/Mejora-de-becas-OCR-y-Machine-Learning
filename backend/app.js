// Importamos los módulos necesarios
const express = require('express'); // Express es un framework para construir aplicaciones web y APIs
const cors = require('cors'); // CORS es un middleware para habilitar CORS (Cross-Origin Resource Sharing)
const db = require('./src/models/db'); // Importamos el módulo de conexión a la base de datos
const bcrypt = require('bcrypt'); // Definimos la ruta para el endpoint de login
const bodyParser = require('body-parser');

// Inicializamos la aplicación de Express
const app = express();

// Opciones de CORS para permitir solicitudes desde múltiples orígenes
var corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:5173'],
};

// Usamos el middleware de CORS con las opciones configuradas
app.use(cors(corsOptions));

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

app.use(bodyParser.json()); 

// Middleware para parsear el cuerpo de las solicitudes con URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "GINO NO BORRES NADA, Ya sabes!!!!" });
});

// Middleware para la ruta de login
app.post('/login', async (req, res) => {
  const { LoginUserName, LoginPassword } = req.body;

  // Verificar que los campos no estén vacíos
  if (!LoginUserName || !LoginPassword) {
    return res.status(400).send({ message: 'Todos los campos son obligatorios' });
  }

  const SQL = 'SELECT * FROM usuarios WHERE nombre = ?'; 
  const Values = [LoginUserName]; 

  try {
    // Ejecutamos la consulta
    db.query(SQL, Values, async (err, results) => {
      if (err) {
        return res.status(500).send({ error: 'Error en la base de datos' });
      }
      if (results.length === 0) {
        return res.status(400).send({ message: 'Las credenciales no coinciden' });
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(LoginPassword, user.password); 

      if (!passwordMatch) {
        return res.status(400).send({ message: 'Las credenciales no coinciden' });
      }

      res.send({ message: 'Login exitoso', user });
    });
  } catch (error) {
    res.status(500).send({ error: 'Error en el servidor' });
  }
});

// Middleware para la ruta de register
app.post('/register', async (req, res) => {
  const { email, userName, password, idRol } = req.body; // Obtener los campos del cuerpo de la solicitud

  // Verificar que los campos requeridos no estén vacíos
  if (!email || !userName || !password) {
    return res.status(400).send({ error: 'Faltan campos requeridos' });
  }

  // Si no se especifica idRol, establecerlo en 3 por defecto
  const role = idRol || 3;

  try {
    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10); // Usar bcrypt.hash para encriptar la contraseña

    // Crear un query para insertar en la base de datos tabla Usuarios
    const SQL = 'INSERT INTO usuarios (email, nombre, password, idRol) VALUES (?, ?, ?, ?)';
    const values = [email, userName, hashedPassword, role]; // Usar la contraseña encriptada y el idRol

    // Ejecutar el query
    db.query(SQL, values, (err, results) => {
      if (err) {
        console.error('Error al insertar usuario:', err); // Loggear el error
        res.status(500).send({ error: 'Error al registrar usuario' }); // Enviar respuesta de error
      } else {
        console.log('Usuario ingresado con éxito'); // Loggear éxito
        res.status(200).send({ message: 'Usuario agregado correctamente' }); // Enviar respuesta de éxito
      }
    });
  } catch (error) {
    console.error('Error al encriptar la contraseña:', error); // Loggear error de encriptación
    res.status(500).send({ error: 'Error al encriptar la contraseña' }); // Enviar respuesta de error
  }
});

// Configuramos el puerto del servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}.`); // Iniciamos el servidor y mostramos un mensaje en la consola
});
