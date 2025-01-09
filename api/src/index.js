// src/index.js
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import mailRoutes from './routes/mailRoutes.js';
import { upload } from './config/multerConfig.js';  // Importa la configuración de multer desde otro archivo

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Usar las rutas definidas
app.use(mailRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
