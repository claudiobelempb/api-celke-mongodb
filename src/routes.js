import { Router } from "express";
import { UserController } from "./app/controllers/UserController";


const routes = new Router();
const userController = new UserController();

routes.get('/users', userController.index);
routes.post('/users', userController.store);

export { routes };