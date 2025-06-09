import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware";
import {
  createGroupSchema,
  updateGroupSchema,
  addMemberSchema,
  validate
} from "../middleware/validationSchema";
import groupController from "../controllers/groupController";

const groupRouter = express.Router();

groupRouter.use(authenticate);

groupRouter.get("/", groupController.getAllGroups);
groupRouter.get("/my-groups", groupController.getUserGroups);
groupRouter.post("/", validate(createGroupSchema), groupController.createGroup);

groupRouter.get("/:id", groupController.getGroupById);
groupRouter.put("/:id", validate(updateGroupSchema), groupController.updateGroup);
groupRouter.delete("/:id", groupController.deleteGroup);

groupRouter.get("/:id/members", groupController.getGroupMembers);
groupRouter.post("/:id/members", validate(addMemberSchema), groupController.addMember);
groupRouter.delete("/:id/members/:userId", groupController.removeMember);

groupRouter.post("/:id/join", groupController.joinGroup);
groupRouter.post("/:id/leave", groupController.leaveGroup);

groupRouter.get("/admin/all", authorize(["ADMIN"]), groupController.getAllGroups);

export default groupRouter;
