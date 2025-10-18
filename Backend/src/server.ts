import { container } from "./di/container";
import { inject, injectable } from "tsyringe";
import { IApp } from "./interfaces/Iapp";
import { IDataBase } from "./interfaces/Idatabase";
import { config } from "./config/env.config";

@injectable()
export class Server {
  constructor(
    @inject("IApp") private _app: IApp,
    @inject("IDataBase") private _database: IDataBase
  ) {}

  public async startServer(): Promise<void> {
    try {
      const server = this._app.getServer();
      await this._database.connect();
      server.listen(process.env.PORT, () =>
        console.log(
          `Adhar-OCR server is running at http://localhost:${config.PORT}`
        )
      );
    } catch (error) {
      console.log("server to failed to setart:", error);
      process.exit(1);
    }
  }
}

const server = container.resolve(Server);

server.startServer();
