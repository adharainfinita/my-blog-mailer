import nodemailer from "nodemailer";


export const sendEmail = async (to: string, subject: string, text: string, attachments?: any) => {
  process.loadEnvFile();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    attachments, // Aquí ahora aceptamos archivos en memoria
  };

  await transporter.sendMail(mailOptions);
};
