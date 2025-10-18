import { Server as HttpServer } from "http";

export interface IApp {
  getServer(): HttpServer;
}
