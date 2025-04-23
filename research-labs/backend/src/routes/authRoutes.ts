import express from 'express';
import authController from '../controllers/authController';
import {
  registrationSchema,
  loginSchema,
  validate
} from '../middleware/validationSchema';

const authRouter = express.Router();

authRouter.post('/register', validate(registrationSchema), authController.register);
authRouter.post('/login', validate(loginSchema), authController.login);
authRouter.post('/logout', authController.logout);

export default authRouter;
