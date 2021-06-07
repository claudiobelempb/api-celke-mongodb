import express from "express";
import { routes } from "./routes";
import "./database";

class App {
  constructor(){
    this.app = express();
    this.routes();
    this.app.use(express.json());
  }

  routes(){
    this.app.use(routes);
  }
}

//export { App, app };
export default new App().app;