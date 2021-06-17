import express from "express";
import path from 'path';
import { routes } from "./routes";
import "./config/config";
import "./config/connect";

class App {
  constructor(){
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.app.use(express.json());
    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  routes(){
    this.app.use(routes);
  }
}

//export { App, app };
export default new App().app;