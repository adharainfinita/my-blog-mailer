import express from 'express';
import fs from 'fs';
import nodemailer from 'nodemailer';
import morgan from 'morgan';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// Configurar multer para la carga de archivos
const upload = multer({
    dest: 'uploads/', // Carpeta donde se guardarán los archivos
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['text/plain', 'application/pdf']; // Tipos MIME permitidos
        if (!allowedMimes.includes(file.mimetype)) {
            return cb(new Error('Invalid file type'), false); // Error si el tipo MIME no es permitido
        }
        cb(null, true); // Aceptar el archivo
    }
});

// Definir __dirname para módulos ES
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Simulando una base de datos
const DB_PATH = './subscribers.json';

// Inicializar base de datos si no existe
if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, JSON.stringify([]), 'utf8');

// Ruta para gestionar suscripciones
app.post('/subscribe', (req, res) => {
    const { email, action } = req.body;
    if (!email || !['add', 'remove'].includes(action)) return res.status(400).send('Invalid data');

    const subscribers = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    if (action === 'add' && !subscribers.includes(email)) {
        subscribers.push(email);
    } else if (action === 'remove') {
        const index = subscribers.indexOf(email);
        if (index !== -1) subscribers.splice(index, 1);
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(subscribers, null, 2));
    res.send(`Email ${action === 'add' ? 'added' : 'removed'} successfully.`);
});

// Ruta para recibir archivos y enviar correos
app.post('/send-mails', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    
    // Verificación de tipo MIME
    if (req.file.mimetype === 'text/plain') {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const [title, subtitle, content] = fileContent.split('\n\n');

        // Configurar el transporter de Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL, // Cambia esto por tu email
                pass: process.env.PASSWORD, // Usa una contraseña de aplicación generada desde Gmail
            },
        });

        // Enviar correo a cada suscriptor
        const subscribers = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        subscribers.forEach(email => {
            transporter.sendMail({
                from: process.env.MAIL,
                to: email,
                subject: title,
                html: `<h1>${title}</h1><h2>${subtitle}</h2><p>${content}</p>`,
            });
        });

        // Eliminar archivo temporal después de procesarlo
        fs.unlinkSync(filePath);
    } else if (req.file.mimetype === 'application/pdf') {
        // Si es un PDF, no procesar el contenido, solo enviarlo como adjunto
        const subscribers = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.MAIL,
            to: subscribers.join(','),
            subject: 'Nuevo artículo💜',
            text: 'Se adjunta un nuevo artículo en formato PDF.',
            attachments: [
                {
                    filename: req.file.originalname,
                    path: filePath,
                },
            ],
        };

        // Enviar el correo con el archivo adjunto
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send('Error sending emails: ' + error);
            }
            res.send('Emails sent successfully with the PDF attachment.');

            // Eliminar archivo temporal después de enviar el correo
            fs.unlinkSync(filePath);
        });
    } else {
        return res.status(400).send('Invalid file type.');
    }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
