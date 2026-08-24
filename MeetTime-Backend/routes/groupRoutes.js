import express from "express";
import * as groupController from "../controllers/groupController.js";
import { protect } from "../middleware/auth.js"; 
import {
    requireGroupAdmin,
    requireGroupMember,
} from "../middleware/groupAuthorization.js";

const router = express.Router();

router.use(protect);
router.post("/", groupController.createGroup);
router.post("/join", groupController.joinGroup);
router.get("/", groupController.getMyGroups);

router.get("/:groupId/candidates", requireGroupAdmin, groupController.searchCandidate);
router.get("/:groupId/members", requireGroupMember, groupController.getGroupMembers);
router.get("/:groupId/schedules", requireGroupMember, groupController.getGroupSchedules);

router.delete("/:groupId/members/:targetUserId", requireGroupAdmin, groupController.removeMember);
router.post("/:groupId/members", requireGroupAdmin, groupController.addMemberManual);
router.delete("/:groupId", requireGroupAdmin, groupController.deleteGroup);
router.post('/:groupId/leave', requireGroupMember, groupController.leaveGroup);

export default router;
