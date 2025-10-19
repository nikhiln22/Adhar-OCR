import {
  IAddAadharResponseDto,
} from "../interfaces/Dto/OcrService";
import { IAadharOcrService } from "../interfaces/IocrService";
import { IAadharOcrRepository } from "../interfaces/IocrRepository";
import { IOcrExtractionService } from "../interfaces/IocrExtractionService";
import { inject, injectable } from "tsyringe";

@injectable()
export class AadharOcrService implements IAadharOcrService {
  constructor(
    @inject("IOcrExtractionService")
    private _ocrExtractionService: IOcrExtractionService,
    @inject("IAadharOcrRepository")
    private _aadharOcrRepository: IAadharOcrRepository
  ) {}

  async addAadhar(files: Express.Multer.File[]): Promise<{
    success: boolean;
    message: string;
    data?: IAddAadharResponseDto;
  }> {
    try {
      console.log("Entering service: processing both Aadhaar images");

      if (!files || files.length < 2) {
        return {
          success: false,
          message: "Both front and back Aadhaar images are required",
        };
      }

      const frontImage = files[0] as Express.Multer.File;
      const backImage = files[1] as Express.Multer.File;

      const extractedData = await this._ocrExtractionService.extractBothImages(
        frontImage,
        backImage
      );

      console.log("Extracted Aadhaar Data:", extractedData);

      if (
        !extractedData.name ||
        !extractedData.dob ||
        !extractedData.aadharNumber ||
        !extractedData.address || 
        !extractedData.gender
      ) {
        return {
          success: false,
          message: "Could not extract all required fields from Aadhaar card",
        };
      }

      const saved = await this._aadharOcrRepository.addAadhar(extractedData);

      if (!saved) {
        return {
          success: false,
          message: "Failed to save Aadhaar data",
        };
      }

      return {
        success: true,
        message: "Aadhaar details extracted and saved successfully",
        data: saved,
      };
    } catch (error) {
      console.error("Error in AadharOcrService:", error);
      return {
        success: false,
        message: "Failed to extract or save Aadhaar data",
      };
    }
  }
}
