import express, { Express } from "express";
import cors from "cors";
import { createServer, Server as HttpServer } from "http";
import { injectable } from "tsyringe";
import { IApp } from "./interfaces/Iapp";
import { config } from "./config/env.config";

@injectable()
export class App implements IApp {
  public app: Express;
  public server: HttpServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.setUpMiddlewares();
  }

  private setUpMiddlewares(): void {
    const corsOptions = {
      origin: config.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }

  public getServer(): HttpServer {
    return this.server;
  }
}
