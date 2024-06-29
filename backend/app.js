// Importamos los módulos necesarios
const express = require('express'); // Express es un framework para construir aplicaciones web y APIs
const cors = require('cors'); // CORS es un middleware para habilitar CORS (Cross-Origin Resource Sharing)
const bcrypt = require('bcrypt'); // Definimos la ruta para el endpoint de login
const bodyParser = require('body-parser');
const estudianteRoute = require('./routes/estudianteRoute');
const roleRoute = require('./routes/roleRoute');
const seguimientoRoute = require('./routes/seguimientoRoute');
const solicitudesRoute = require('./routes/solicitudRoute');
const ingresoFamiliaRoute = require('./routes/ingresoFamiliaRoute');
const usuarioRoute = require('./routes/usuarioRoute');
const historialAcademicoRoute = require('./routes/historialAcademicoRoute');
const documentoRoute = require('./routes/documentoRoute');
const comunicacionRoute = require('./routes/comunicacionRoute');
const historialAccesoRoute = require('./routes/historialAccesoRoute');
const mysql = require('mysql2/promise'); // Versión de mysql2 que soporta promesas

// Inicializamos la aplicación de Express
const app = express();

// Opciones de CORS para permitir solicitudes desde múltiples orígenes
var corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:5173'],
};

const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',  // usa cadena vacía si no tiene password
  database: process.env.DB_NAME
};

// Usamos el middleware de CORS con las opciones configuradas
app.use(cors(corsOptions));

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

app.use(bodyParser.json()); 

app.use('/octi',estudianteRoute);
app.use('/octi',roleRoute);
app.use('/octi',seguimientoRoute); 
app.use('/octi',solicitudesRoute);
app.use('/octi',ingresoFamiliaRoute);
app.use('/octi',usuarioRoute);
app.use('/octi',historialAcademicoRoute);
app.use('/octi',documentoRoute);
app.use('/octi',comunicacionRoute); 
app.use('/octi',historialAccesoRoute);

// Middleware para parsear el cuerpo de las solicitudes con URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "GINO NO BORRES NADA, Ya sabes!!!!" });
});

app.post('/login', async (req, res) => {
  const { LoginUserName, LoginPassword } = req.body;

  if (!LoginUserName || !LoginPassword) {
    return res.status(400).send({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const connection = await mysql.createConnection(db);
    console.log('Conexión establecida');

    const [results] = await connection.execute('SELECT * FROM usuarios WHERE nombre = ?', [LoginUserName]);
      
    if (results.length === 0) {
      console.log('No hay resultados para usuario');
      return res.status(400).send({ error: 'Las credenciales no coinciden' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(LoginPassword, user.password);

    if (!passwordMatch) {
      console.log('No hay resultados para contraseña');
      return res.status(400).send({ error: 'Las credenciales no coinciden' });
    }

    try {
      // Insertar el registro de acceso directamente
      const [insertedRow] = await connection.execute(
        'INSERT INTO historialacceso (idUsuario, fechaHora, tipoAccion) VALUES (?, NOW(), ?)',
        [user.idUsuario, 'Inicio de sesión']
      );
      
      console.log('Número de filas afectadas:', insertedRow.affectedRows);

      if (insertedRow && insertedRow.affectedRows > 0) {
        console.log('registro exitoso');
        // aqui deberia ir lo que manda res.send(results)
        res.send({ message: 'Login exitoso', user });
        
      } else {
        console.error('Error: No se afectaron filas');
        res.status(500).send({ error: 'Error al registrar acceso' });
      }
    } catch (error) {
      console.error('Error al insertar registro de acceso:', error.message);
      res.status(500).send({ error: 'Error al insertar registro de acceso' });
    } finally {
      await connection.end();
    }
  } catch (error) {
    console.error('Error en el servidor:', error);
    res.status(500).send({ error: 'Error en el servidor' });
  }
});



// Endpoint para registrar un nuevo usuario
app.post('/register', async (req, res) => {
  // Obtener los datos del cuerpo de la solicitud
  const { Email, UserName, Password } = req.body;

  // Verificar que los campos requeridos no estén vacíos
  if (!Email || !UserName || !Password) {
    return res.status(400).send({ error: 'Faltan campos requeridos' });
  }

  try {
    const connection = await mysql.createConnection(db);

    // Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Crear un nuevo usuario en la base de datos
    const [rows] = await connection.execute('INSERT INTO usuarios (email, nombre, password, idRol) VALUES (?, ?, ?, ?)', [Email, UserName, hashedPassword, 2]);

    if (rows.affectedRows === 0) {
      await connection.end();
      return res.status(500).send({ error: 'Error al registrar usuario' });
    }

    await connection.end();

    console.log('Usuario ingresado con éxito');
    res.status(201).send({ message: 'Usuario agregado correctamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).send({ error: 'Error al registrar usuario' });
  }
});

//estudiante 
app.use('/octi', estudianteRoute);

// Configuramos el puerto del servidor
const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto ${PORT}.`); // Iniciamos el servidor y mostramos un mensaje en la consola
});


