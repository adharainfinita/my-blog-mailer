import fs from "fs";
import { Request, Response } from "express";
import { DB_PATH } from "../utils/constants.js";

export const manageSubscription = (req: Request, res: Response): void => {
  const { email, action } = req.body;

  if (!email || !["add", "remove"].includes(action)) {
    res.status(400).send("Invalid data");
    return;
  }

  try {
    const data = fs.readFileSync(DB_PATH, "utf8");
    const subscribers: string[] = JSON.parse(data);

    if (action === "add" && !subscribers.includes(email)) {
      subscribers.push(email);
    } else if (action === "remove") {
      const index = subscribers.indexOf(email);
      if (index !== -1) subscribers.splice(index, 1);
    }

    fs.writeFileSync(DB_PATH, JSON.stringify(subscribers, null, 2));
    res.send(`Email ${action === "add" ? "added" : "removed"} successfully.`);
  } catch (error) {
    console.error("Error handling subscription:", error);
    res.status(500).send("Internal server error");
  }
};
