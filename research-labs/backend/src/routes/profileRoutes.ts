import express from "express";
import { authenticate, authorize } from '../middleware/authMiddleware';
import { updateUserSchema, createUserSchema, validate } from '../middleware/validationSchema';
import profileController from '../controllers/profileController'

const profileRouter = express.Router();

profileRouter.use(authenticate);

profileRouter.get('/users/:id', profileController.getUserById);
profileRouter.put('/users/:id', validate(updateUserSchema), profileController.updateUser);
profileRouter.put('/users/:id/notify-delete', profileController.notifyDeleteUser);

profileRouter.get('/users', authorize(['ADMIN']), profileController.getAllUsers);
profileRouter.post('/users', authorize(['ADMIN']), validate(createUserSchema), profileController.createUser);
profileRouter.put('/users/:id/activate', authorize(['ADMIN']), profileController.activeUser);
profileRouter.put('/users/:id/suspend', authorize(['ADMIN']), profileController.suspendUser);
profileRouter.delete('/users/:id', authorize(['ADMIN']), profileController.deleteUser);

export default profileRouter;
