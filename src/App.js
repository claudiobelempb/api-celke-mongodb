import express from "express";
import cors from 'cors';
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

    this.app.use((request, response, next) => {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
      response.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type");

      this.app.use(cors());
      next();
    });
  }

  routes(){
    this.app.use(routes);
  }
}

//export { App, app };
export default new App().app;