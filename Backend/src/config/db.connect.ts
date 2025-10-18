import { IDataBase } from "../interfaces/Idatabase";
import mongoose from "mongoose";
import { injectable } from "tsyringe";
import { config } from "./env.config";

@injectable()
export class MongoDBConnection implements IDataBase {
  async connect(): Promise<void> {
    try {
      if (!config.MONGODB_URI) {
        return;
      }
      await mongoose.connect(config.MONGODB_URI);
      console.log("connected to the Database Successfully");
    } catch (error) {
      console.log("MongoDb connection Error:", error);
      process.exit(1);
    }
  }
}
