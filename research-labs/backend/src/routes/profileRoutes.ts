import express from "express";
import profileController from '@controllers/profileController'

const profileRouter = express.Router();

profileRouter.get('/users')
profileRouter.get('/users/[id]')
profileRouter.get('/users/[username]')

profileRouter.post('/users/[id]')
profileRouter.post('/users/[username]')

profileRouter.put('/users/[username]')
