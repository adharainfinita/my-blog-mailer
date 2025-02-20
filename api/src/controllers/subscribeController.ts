import { Request, Response } from "express";
import { Subscriber } from "../models/Subscriber.js";

export const manageSubscription = async (req: Request, res: Response) => {
  try {
    const { email, action } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    if (action === "add") {
      const exists = await Subscriber.findOne({ email });
      if (exists) return res.status(400).json({ error: "Email already subscribed" });

      await Subscriber.create({ email });
      return res.json({ message: "Subscribed successfully" });
    } else if (action === "remove") {
      await Subscriber.deleteOne({ email });
      return res.json({ message: "Unsubscribed successfully" });
    }

    res.status(400).json({ error: "Invalid action" });
  } catch (error) {
    console.error("Subscription error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
