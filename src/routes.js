import { Router } from "express";
import { UserController } from "./app/controllers/UserController";
import { LoginController } from "./app/controllers/LoginController";

import auth from './app/middlewares/auth';


const routes = new Router();
const userController = new UserController();
const loginController = new LoginController();

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.post('/users', userController.store);
routes.put('/users/:id', auth, userController.update);
routes.delete('/users/:id', userController.delete);

routes.post('/login', loginController.store);

export { routes };