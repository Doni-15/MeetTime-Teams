import express from "express";
import * as chatController from "../controllers/chatController.js";
import { protect } from "../middleware/auth.js"; 
import {
    requireAnnouncementAdmin,
    requireGroupMember,
} from "../middleware/groupAuthorization.js";

const router = express.Router();

router.use(protect);
router.post(
    "/:groupId",
    requireGroupMember,
    requireAnnouncementAdmin,
    chatController.sendMessage
);
router.get("/:groupId", requireGroupMember, chatController.getMessages);

export default router;
