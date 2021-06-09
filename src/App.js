import express from "express";
import { routes } from "./routes";
import "./config/connect";

class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json());
  }

  routes(){
    this.app.use(routes);
  }
}

//export { App, app };
export default new App().app;