import express from "express";
import * as chatController from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js"; 

const router = express.Router();

router.use(protect);
router.post("/:groupId", chatController.sendMessage);
router.get("/:groupId", chatController.getMessages);

export default router;