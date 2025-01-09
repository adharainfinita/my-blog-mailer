import express from 'express';
import { manageSubscription } from '../controllers/subscribeController';
import { sendMailController } from '../controllers/mailController';

const router = express.Router();

// Ruta para gestionar suscripciones
router.post('/subscribe', manageSubscription);

// Ruta para recibir archivos y enviar correos
router.post('/send-mails', upload.single('file'), sendMailController);

export default router;
