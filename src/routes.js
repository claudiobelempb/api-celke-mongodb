import { Router } from "express";
import { UserController } from "./app/controllers/UserController";
import { LoginController } from "./app/controllers/LoginController";
import { ProfileController } from './app/controllers/ProfileController';

import authMiddlewares from './app/middlewares/auth';
import auth from "./app/middlewares/auth";


const routes = new Router();
const userController = new UserController();
const loginController = new LoginController();
const profileController = new ProfileController();

routes.get('/users', authMiddlewares, userController.index);
routes.get('/users/:id', authMiddlewares, userController.show);
routes.post('/users', userController.store);
routes.put('/users', authMiddlewares, userController.update);
routes.delete('/users/:id', authMiddlewares, userController.delete);

routes.get('/profile', authMiddlewares, profileController.show);
routes.put('/profile', authMiddlewares, profileController.update);

routes.post('/login', loginController.store);

export { routes };