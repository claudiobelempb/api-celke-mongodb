import { Router } from "express";
import { UserController } from "./app/controllers/UserController";
import { LoginController } from "./app/controllers/LoginController";

import authMiddlewares from './app/middlewares/auth';


const routes = new Router();
const userController = new UserController();
const loginController = new LoginController();

routes.get('/users', authMiddlewares, userController.index);
routes.get('/users/:id', authMiddlewares, userController.show);
routes.post('/users', userController.store);
routes.put('/users/:id', authMiddlewares, userController.update);
routes.delete('/users/:id', authMiddlewares, userController.delete);

routes.post('/login', loginController.store);

export { routes };