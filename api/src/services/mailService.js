import transporter from '../config/mailConfig';

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
