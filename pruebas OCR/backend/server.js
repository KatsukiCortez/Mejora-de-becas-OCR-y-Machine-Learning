const express = require('express');
const multer = require('multer');
const pdfPoppler = require('pdf-poppler');
const Tesseract = require('tesseract.js');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Función para convertir PDF a imágenes usando pdf-poppler
const pdfToImages = async (pdfPath) => {
    const outputDir = path.join(__dirname, 'images');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const options = {
        format: 'png',
        out_dir: outputDir,
        out_prefix: path.basename(pdfPath, path.extname(pdfPath)),
        page: null // Convertir todas las páginas
    };

    await pdfPoppler.convert(pdfPath, options);
    const images = fs.readdirSync(outputDir).map(file => path.join(outputDir, file));
    return images;
};

// Ruta para manejar la subida de archivos
app.post('/upload', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;
    const fileType = req.file.mimetype;

    if (fileType === 'application/pdf') {
        try {
            const images = await pdfToImages(filePath);
            let fullText = '';

            // Procesa cada imagen con Tesseract para extraer texto
            for (const image of images) {
                const { data: { text } } = await Tesseract.recognize(image, 'spa');
                fullText += text + '\n';
            }

            // Elimina las imágenes temporales
            images.forEach(image => fs.unlinkSync(image));

            res.json({ text: fullText });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al procesar el PDF.' });
        }
    } else {
        res.status(400).json({ error: 'Formato de archivo no válido. Solo se aceptan PDFs.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
