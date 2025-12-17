import express from "express";
import * as groupController from "../controllers/groupController.js";
import { protect } from "../middleware/auth.js"; 

const router = express.Router();

router.use(protect);
router.post("/", groupController.createGroup);
router.post("/join", groupController.joinGroup);
router.get("/", groupController.getMyGroups);
router.get("/cari-member", groupController.searchCandidate);

router.get("/:groupId/members", groupController.getGroupMembers);
router.get("/:groupId/schedules", groupController.getGroupSchedules);

router.delete("/:groupId/members/:targetUserId", groupController.removeMember);
router.post("/:groupId/members", groupController.addMemberManual);
router.delete("/:groupId", groupController.deleteGroup);
router.post('/:groupId/leave', groupController.leaveGroup);

export default router;