import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IAadharOcrService } from "../interfaces/IocrService";
import { HttpStatusCodes } from "../utils/httpStatusCode";

@injectable()
export class OcrController {
  constructor(@inject("IOcrService") private _ocrService: IAadharOcrService) {}

  async saveData(req: Request, res: Response): Promise<void> {
    try {
      console.log("Entered OCR Controller to parse Aadhaar data");

      const files = req.files as Express.Multer.File[];

      if (!files || files.length < 2) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
          success: false,
          message:
            "Please upload both front and back images of the Aadhaar card",
        });
        return;
      }

      const response = await this._ocrService.addAadhar(files);

      res.status(HttpStatusCodes.OK).json(response);
    } catch (error) {
      console.error("Error in controller:", error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong while processing the Aadhaar",
      });
    }
  }
}
