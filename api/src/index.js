// src/index.js
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import mailRoutes from './routes/mailRoutes.js'; // Importa tus rutas definidas en mailRoutes.js

const app = express();

// Middleware para manejo de JSON y logs
app.use(express.json());
app.use(morgan('dev'));

// Rutas definidas
app.use('/api', mailRoutes);

// Exportar el handler para Vercel
export default app;
