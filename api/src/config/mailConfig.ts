import nodemailer from 'nodemailer';

process.loadEnvFile();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo
    pass: process.env.EMAIL_PASS, // Contraseña de la aplicación
  },
});

export default transporter;
