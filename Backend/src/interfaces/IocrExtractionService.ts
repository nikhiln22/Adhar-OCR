import { IAddAadharResponseDto } from "./Dto/OcrService";

export interface IOcrExtractionService {
  extractBothImages(
    frontFile: Express.Multer.File,
    backFile: Express.Multer.File
  ): Promise<IAddAadharResponseDto>;
}
