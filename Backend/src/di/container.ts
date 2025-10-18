import "reflect-metadata";
import { container } from "tsyringe";
import { MongoDBConnection } from "../config/db.connect";
import { App } from "../app";
import { LocalUpload } from "../config/multer.config";
import { AadharOcrService } from "../services/ocrAadharService";
import { OcrExtractionService } from "../services/ocrExtractionService";

container.registerSingleton("IDataBase", MongoDBConnection);
container.registerSingleton("IStorageService", LocalUpload);
container.registerSingleton("IApp", App);
container.registerSingleton("IOcrAadharService", AadharOcrService);
container.registerSingleton("IOcrExtractionService", OcrExtractionService);

export { container };
