import express from "express";
import upload  from "../config/multerConfig.js";
import { manageSubscription } from "../controllers/subscribeController.js";
import { sendMailController } from "../controllers/mailController.js";

const router = express.Router();

router.post("/subscribe", manageSubscription);
router.post("/send-mails", upload.single("file"), sendMailController);

export default router;
