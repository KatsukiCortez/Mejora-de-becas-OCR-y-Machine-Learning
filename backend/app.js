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

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfPoppler = require('pdf-poppler');
const Tesseract = require('tesseract.js');
const stopwords = require('stopword');

// Inicializamos la aplicación de Express
const app = express();

// Opciones de CORS para permitir solicitudes desde múltiples orígenes
var corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:5173'],
};

// Base de datos
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

app.use('/octi', estudianteRoute);
app.use('/octi', roleRoute);
app.use('/octi', seguimientoRoute); 
app.use('/octi', solicitudesRoute);
app.use('/octi', ingresoFamiliaRoute);
app.use('/octi', usuarioRoute);
app.use('/octi', historialAcademicoRoute);
app.use('/octi', documentoRoute);
app.use('/octi', comunicacionRoute); 
app.use('/octi', historialAccesoRoute);

// Middleware para parsear el cuerpo de las solicitudes con URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "GINO NO BORRES NADA, Ya sabes!!!!" });
});

// Endpoint para el login
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
      const [insertedRow] = await connection.execute(
        'INSERT INTO historialacceso (idUsuario, fechaHora, tipoAccion) VALUES (?, NOW(), ?)',
        [user.idUsuario, 'Inicio de sesión']
      );
      
      console.log('Número de filas afectadas:', insertedRow.affectedRows);

      if (insertedRow && insertedRow.affectedRows > 0) {
        console.log('registro exitoso');
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
  const { Email, UserName, Password } = req.body;

  if (!Email || !UserName || !Password) {
    return res.status(400).send({ error: 'Faltan campos requeridos' });
  }

  try {
    const connection = await mysql.createConnection(db);
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

// Asegúrate de que el directorio uploads existe
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)){
  fs.mkdirSync(uploadsDir);
}

// Configurar Multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Asegúrate de que uploadsDir esté correctamente definido
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Función para convertir PDF a imágenes usando pdf-poppler
const pdfToImages = async (pdfPath) => {
    const outputDir = path.join(__dirname, 'images');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const options = {
        format: 'jpg',
        out_dir: outputDir,
        out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
        page: null // Convertir todas las páginas
    };

    await pdfPoppler.convert(pdfPath, options);
    const images = fs.readdirSync(outputDir).map(file => path.join(outputDir, file));
    return images;
};

// Función para limpiar y preprocesar el texto
const preprocessText = (text) => {
    // Convertir a minúsculas
    let cleanedText = text.toLowerCase();

    // Eliminar caracteres especiales, pero mantener espacios y letras
    cleanedText = cleanedText.replace(/[^a-záéíóúüñ\s]/gi, '');

    // Tokenizar el texto
    let tokens = cleanedText.split(/\s+/);

    // Eliminar palabras vacías
    tokens = stopwords.removeStopwords(tokens, stopwords.es);

    // Imprimir texto limpio y tokens en consola
    // console.log("Texto limpio:", cleanedText);
    // console.log("Tokens:", tokens);

    return tokens;
};

// Función para extraer datos de OCR y llenar tablas específicas
const extractDataFromOCR = (tokens, text) => {
  const extractedData = {
      historialAcademico: {
          promedio: null,
          institucionEducativa: ''
      },
      ingresosFamiliares: {
          ingresosMensuales: null,
          numMiembrosFamilia: null
      }
  };

  const educationKeywords = ['colegio', 'universidad', 'instituto', 'escuela'];
  const incomeKeywords = ['ingresos', 'mensuales', 'miembros', 'familia'];

  // Extraer promedio de historial académico
  const promedioRegex = /promedio\s*:\s*(\d+(\.\d+)?)/i;
  const promedioMatch = text.match(promedioRegex);
  if (promedioMatch) {
      extractedData.historialAcademico.promedio = parseFloat(promedioMatch[1]);
  }

  // Extraer institución educativa de historial académico
  tokens.forEach(token => {
      if (educationKeywords.includes(token)) {
          extractedData.historialAcademico.institucionEducativa = token;
      }
  });

  // Extraer ingresos mensuales de ingresos familiares
  const ingresosRegex = /ingresos\s*:\s*(\d+(\.\d+)?)/i;
  const ingresosMatch = text.match(ingresosRegex);
  if (ingresosMatch) {
      extractedData.ingresosFamiliares.ingresosMensuales = parseFloat(ingresosMatch[1]);
  }

  // Extraer número de miembros de la familia
  const miembrosRegex = /miembros\s*:\s*(\d+)/i;
  const miembrosMatch = text.match(miembrosRegex);
  if (miembrosMatch) {
      extractedData.ingresosFamiliares.numMiembrosFamilia = parseInt(miembrosMatch[1]);
  }

  return extractedData;
};


// Endpoint para subir archivos PDF y llenar tablas específicas
app.post('/octi/upload', upload.single('file'), async (req, res) => {
  const { studentId } = req.body;
  const file = req.file;

  if (!file || !studentId) {
      return res.status(400).send({ error: 'Archivo o ID de estudiante no proporcionados' });
  }

  if (file.mimetype === 'application/pdf') {
      try {
          const images = await pdfToImages(file.path);
          let fullText = '';

          // Procesar cada imagen con Tesseract para extraer texto
          for (const image of images) {
              const { data: { text } } = await Tesseract.recognize(image, 'spa');
              fullText += text + '\n';
          }

          // Eliminar imágenes temporales
          images.forEach(image => fs.unlinkSync(image));

          // Preprocesar el texto extraído
          const tokens = preprocessText(fullText);

          // Extraer datos específicos para historial académico y ingresos familiares
          const extractedData = extractDataFromOCR(tokens, fullText);

          // Guardar el resultado en la base de datos
          const connection = await mysql.createConnection(db);

          // Insertar en historialacademico
          const [result1] = await connection.execute(
              'INSERT INTO historialacademico (promedio, institucionEducativa, idEstudiante) VALUES (?, ?, ?)',
              [
                  extractedData.historialAcademico.promedio,
                  extractedData.historialAcademico.institucionEducativa,
                  studentId
              ]
          );

          // Insertar en ingresofamiliares
          const [result2] = await connection.execute(
              'INSERT INTO ingresofamiliares (ingresosMensuales, numMiembrosFamilia, idEstudiante) VALUES (?, ?, ?)',
              [
                  extractedData.ingresosFamiliares.ingresosMensuales,
                  extractedData.ingresosFamiliares.numMiembrosFamilia,
                  studentId
              ]
          );

          await connection.end();

          if (result1.affectedRows === 0 || result2.affectedRows === 0) {
              return res.status(500).send({ error: 'Error al guardar los resultados del OCR' });
          }

          res.status(200).send({ message: 'Archivo subido y procesado con éxito', file });

      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Error al procesar el PDF.' });
      }
  } else {
      res.status(400).json({ error: 'Formato de archivo no válido. Solo se aceptan PDFs.' });
  }
});

//estudiante
app.use('/octi', estudianteRoute);

// Configuramos el puerto del servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}.`);
});
