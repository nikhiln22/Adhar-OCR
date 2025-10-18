import {
  IAddAadharResponseDto,
  IAddAadharRequestDto,
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

      const frontData = await this._ocrExtractionService.extractDataFromImage(
        frontImage
      );
      const backData = await this._ocrExtractionService.extractDataFromImage(
        backImage
      );

      if (
        !frontData.name ||
        !frontData.dob ||
        !frontData.aadharNumber ||
        !backData.address
      ) {
        return {
          success: false,
          message: "Name, DOB, Aadhaar number or address is missing",
        };
      }

      const combinedData: IAddAadharRequestDto = {
        name: frontData.name,
        dob: frontData.dob,
        address: backData.address,
        aadharNumber: frontData.aadharNumber || backData.aadharNumber || "",
      };

      const saved = await this._aadharOcrRepository.addAadhar(combinedData);

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
