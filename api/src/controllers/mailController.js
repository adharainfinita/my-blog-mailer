import fs from 'fs';
import path from 'path';
import { readFileContent, deleteFile } from '../utils/fileUtils';
import { sendEmail } from '../services/mailService';
import { DB_PATH } from '../utils/constants.js';

export const sendMailController = async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  
  // Verificación de tipo MIME
  if (req.file.mimetype === 'text/plain') {
    const fileContent = readFileContent(filePath);
    const [title, subtitle, content] = fileContent.split('\n\n');

    const subscribers = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    const promises = subscribers.map(email => {
      return sendEmail(email, title, `<h1>${title}</h1><h2>${subtitle}</h2><p>${content}</p>`);
    });

    try {
      await Promise.all(promises);
      deleteFile(filePath);  // Eliminar archivo después de procesar
      res.send('Emails sent successfully.');
    } catch (error) {
      res.status(500).send('Error sending emails: ' + error.message);
    }
  } else if (req.file.mimetype === 'application/pdf') {
    const subscribers = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    const mailOptions = {
      subject: 'Nuevo artículo💜',
      text: 'Se adjunta un nuevo artículo en formato PDF.',
      attachments: [{ filename: req.file.originalname, path: filePath }],
    };

    try {
      await sendEmail(subscribers.join(','), mailOptions.subject, mailOptions.text, mailOptions.attachments);
      deleteFile(filePath); // Eliminar archivo después de enviar
      res.send('Emails sent successfully with the PDF attachment.');
    } catch (error) {
      res.status(500).send('Error sending emails: ' + error.message);
    }
  } else {
    return res.status(400).send('Invalid file type.');
  }
};
