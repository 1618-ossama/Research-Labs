// src/routes/profile.ts
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware";
import { updateUserSchema, createUserSchema, validate } from "../middleware/validationSchema";
import profileController from "../controllers/profileController";

const profileRouter = express.Router();

// first, wire up the token‐reading middleware:
profileRouter.use(authenticate);

// **NEW**: this will handle GET /profile
profileRouter.get("/", (req, res) => {
  // raw token from the cookie
  const token = req.cookies["AccessTokenCookie"];
  console.log("token::::");
  console.log(token);
  // decoded payload set by authenticate()
  const payload = req.user;

  res.json({
    token,
    payload,
  });
});

// your existing CRUD routes:
profileRouter.get("/users/:id", profileController.getUserById);
profileRouter.put("/users/:id", validate(updateUserSchema), profileController.updateUser);
profileRouter.put("/users/:id/notify-delete", profileController.notifyDeleteUser);

profileRouter.get("/users", authorize(["ADMIN"]), profileController.getAllUsers);
profileRouter.post("/users", authorize(["ADMIN"]), validate(createUserSchema), profileController.createUser);
profileRouter.put("/users/:id/activate", authorize(["ADMIN"]), profileController.activeUser);
profileRouter.put("/users/:id/suspend", authorize(["ADMIN"]), profileController.suspendUser);
profileRouter.delete("/users/:id", authorize(["ADMIN"]), profileController.deleteUser);

export default profileRouter;
