import { Router } from "express";
import multer from 'multer';

import { UserController } from "./app/controllers/UserController";
import { LoginController } from "./app/controllers/LoginController";
import { ProfileController } from './app/controllers/ProfileController';
import { UserAvatarController } from './app/controllers/UserAvatarController';

import authMiddlewares from './app/middlewares/auth';
import { uploadCelke } from "./app/middlewares/upload-celke";

const routes = new Router();
const updateAvatar = multer(uploadCelke);

const userController = new UserController();
const loginController = new LoginController();
const profileController = new ProfileController();
const userAvatarController = new UserAvatarController();

routes.get('/users', authMiddlewares, userController.index);
routes.get('/users/:id', authMiddlewares, userController.show);
routes.post('/users', userController.store);
routes.put('/users', authMiddlewares, userController.update);
routes.delete('/users/:id', authMiddlewares, userController.delete);

routes.get('/profile', authMiddlewares, profileController.show);
routes.put('/profile', authMiddlewares, profileController.update);

routes.patch('/profile/avatar', authMiddlewares, updateAvatar.single('avatar'), userAvatarController.update);

routes.post('/login', loginController.store);

export { routes };