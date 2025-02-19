import { Request, Response } from "express";
import { sendEmail } from "../services/mailService.js";
import { DB_PATH } from "../utils/constants.js";
import fs from "fs";

export const sendMailController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const subscribers: string[] = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

    if (req.file.mimetype === "text/plain") {
      // Leer el contenido directamente desde el buffer
      const fileContent = req.file.buffer.toString("utf-8");
      const [title, subtitle, content] = fileContent.split("\n\n");

      const promises = subscribers.map((email) =>
        sendEmail(email, title, `<h1>${title}</h1><h2>${subtitle}</h2><p>${content}</p>`)
      );

      await Promise.all(promises);
      res.send("Emails sent successfully.");
      return;
    }

    if (req.file.mimetype === "application/pdf") {
      const mailOptions = {
        subject: "Nuevo artículo💜",
        text: "Se adjunta un nuevo artículo en formato PDF.",
        attachments: [
          {
            filename: req.file.originalname,
            content: req.file.buffer, // Usamos el buffer en lugar de un archivo físico
          },
        ],
      };

      await sendEmail(subscribers.join(","), mailOptions.subject, mailOptions.text, mailOptions.attachments);
      res.send("Emails sent successfully with the PDF attachment.");
      return;
    }

    res.status(400).send("Invalid file type.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending emails: " + (error as Error).message);
  }
};
