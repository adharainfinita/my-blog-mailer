import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL, // Tu correo
    pass: process.env.PASSWORD, // Contraseña de la aplicación
  },
});

export default transporter;
