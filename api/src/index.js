import express from 'express';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';
import mailRoutes from './routes/mailRoutes';

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Configurar multer para la carga de archivos
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['text/plain', 'application/pdf'];
    if (!allowedMimes.includes(file.mimetype)) {
      return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
  },
});

// Usar las rutas definidas
app.use(mailRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
