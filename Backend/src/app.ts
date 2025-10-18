import express, { Express } from "express";
import cors from "cors";
import { createServer, Server as HttpServer } from "http";
import { inject, injectable } from "tsyringe";
import { IApp } from "./interfaces/Iapp";
import { config } from "./config/env.config";
import { OcrRoutes } from "./routes/aadharOcr.routes";

@injectable()
export class App implements IApp {
  public app: Express;
  public server: HttpServer;

  constructor(@inject(OcrRoutes) private ocrRoutes: OcrRoutes) {
    this.app = express();
    this.server = createServer(this.app);
    this.setUpMiddlewares();
    this.configureRoutes();
  }

  private setUpMiddlewares(): void {
    const corsOptions = {
      origin: config.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
  }

  private configureRoutes() {
    this.app.use("/api/ocr", this.ocrRoutes.getRouter());
  }

  public getServer(): HttpServer {
    return this.server;
  }
}
