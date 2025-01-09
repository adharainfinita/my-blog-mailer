import express from 'express';
import { upload } from '../config/multerConfig.js'
import { manageSubscription } from '../controllers/subscribeController.js';
import { sendMailController } from '../controllers/mailController.js';

const router = express.Router();

// Ruta para gestionar suscripciones
router.post('/subscribe', manageSubscription);

// Ruta para recibir archivos y enviar correos
router.post('/send-mails', upload.single('file'), sendMailController);

export default router;
