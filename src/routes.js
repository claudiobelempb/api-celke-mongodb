import { Router } from "express";
import User from "./app/models/User";


const routes = new Router();

routes.get('/', async (request, response) => {
  await User.create({
    name: "Cláudio",
    email: "claudio.c.lima@hotmail.com",
    password: "123456",
  });
  return response.json({name: "PBconserta"});
});

export { routes };