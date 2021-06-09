import { Router } from "express";
import { UserController } from "./app/controllers/UserController";
import { LoginController } from "./app/controllers/LoginController";


const routes = new Router();
const userController = new UserController();
const loginController = new LoginController();

routes.get('/users', userController.index);
routes.post('/users', userController.store);

routes.post('/login', loginController.store);

export { routes };