import transporter from '../config/mailConfig.js';

export const sendEmail = (to, subject, htmlContent, attachments = []) => {
  const mailOptions = {
    from: process.env.MAIL,
    to,
    subject,
    html: htmlContent,
    attachments,
  };

  return transporter.sendMail(mailOptions);
};
