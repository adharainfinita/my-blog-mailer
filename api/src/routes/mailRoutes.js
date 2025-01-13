import express from 'express';
import { upload } from '../config/multerConfig.js';
import { manageSubscription } from '../controllers/subscribeController.js';
import { sendMailController } from '../controllers/mailController.js';

const app = express();
app.use(express.json());

// Ruta para gestionar suscripciones
app.post('/subscribe', manageSubscription);

// Ruta para recibir archivos y enviar correos
app.post('/send-mails', upload.single('file'), sendMailController);

// Exporta el handler para Vercel
export default app;
