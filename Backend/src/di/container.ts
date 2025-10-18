import "reflect-metadata";
import { container } from "tsyringe";
import { MongoDBConnection } from "../config/db.connect";
import { App } from "../app";
import { LocalUpload } from "../config/multer.config";
import { AadharOcrService } from "../services/ocrAadharService";
import { OcrExtractionService } from "../services/ocrExtractionService";
import { AadharOcrRepository } from "../repository/aadharRepository";
import { aadhar } from "../model/aadharModel";
import { IAdharModel } from "../interfaces/IadharModel";
import { Model } from "mongoose";
import { OcrRoutes } from "../routes/aadharOcr.routes";

container.register<Model<IAdharModel>>("IAdharModel", {
  useValue: aadhar,
});
container.registerSingleton("IDataBase", MongoDBConnection);
container.registerSingleton("IStorageService", LocalUpload);
container.registerSingleton("IApp", App);
container.registerSingleton("IAadharOcrService", AadharOcrService);
container.registerSingleton("IOcrExtractionService", OcrExtractionService);
container.registerSingleton("IAadharOcrRepository", AadharOcrRepository);
container.registerSingleton("OcrRoutes", OcrRoutes);

export { container };
