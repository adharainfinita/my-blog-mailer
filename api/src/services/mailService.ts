import transporter from "../config/mailConfig.js";
import nodemailer from "nodemailer";

// Definir el tipo para los adjuntos del correo
interface Attachment {
  filename: string;
  path: string;
}

// Definir los parámetros que acepta la función `sendEmail`
export const sendEmail = async (
  to: string | string[], // Puede ser un solo destinatario o múltiples
  subject: string,
  htmlContent: string,
  attachments: Attachment[] = []
): Promise<void> => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.MAIL,
    to,
    subject,
    html: htmlContent,
    attachments,
  };

  await transporter.sendMail(mailOptions);
};
