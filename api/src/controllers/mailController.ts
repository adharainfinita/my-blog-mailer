import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { readFileContent, deleteFile } from "../utils/fileUtils.js";
import { sendEmail } from "../services/mailService.js";
import { DB_PATH } from "../utils/constants.js";

export const sendMailController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const filePath = path.join(__dirname, "uploads", req.file.filename);

    if (req.file.mimetype === "text/plain") {
      const fileContent = readFileContent(filePath);
      const [title, subtitle, content] = fileContent.split("\n\n");

      const subscribers: string[] = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
      const promises = subscribers.map((email) =>
        sendEmail(email, title, `<h1>${title}</h1><h2>${subtitle}</h2><p>${content}</p>`)
      );

      await Promise.all(promises);
      deleteFile(filePath);
      res.send("Emails sent successfully.");
      return;
    }

    if (req.file.mimetype === "application/pdf") {
      const subscribers: string[] = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
      const mailOptions = {
        subject: "Nuevo artículo💜",
        text: "Se adjunta un nuevo artículo en formato PDF.",
        attachments: [{ filename: req.file.originalname, path: filePath }],
      };

      await sendEmail(subscribers.join(","), mailOptions.subject, mailOptions.text, mailOptions.attachments);
      deleteFile(filePath);
      res.send("Emails sent successfully with the PDF attachment.");
      return;
    }

    res.status(400).send("Invalid file type.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending emails: " + (error as Error).message);
  }
};
