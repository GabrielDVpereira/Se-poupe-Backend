import "dotenv/config";
import express, {Express} from "express";
import routes from "./routes";
import cors from "cors";
import "./database";

class App {
  app: Express;
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }
}
export default new App().app;
