import express, { Router } from "express";
import { inject, injectable } from "tsyringe";
import { OcrController } from "../controller/ocrController";
import { IStorageService } from "../interfaces/IstorageService";

@injectable()
export class OcrRoutes {
  private router: Router;

  constructor(
    @inject("IStorageService") private _storageService: IStorageService,
    @inject(OcrController) private _ocrController: OcrController
  ) {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.post(
      "/ocr",
      this._storageService.upload.array("files", 2),
      this._ocrController.processAadhar.bind(this._ocrController)
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
