import { IAddAadharResponseDto } from "./Dto/OcrService";

export interface IOcrExtractionService {
  extractDataFromImage(
    file: Express.Multer.File
  ): Promise<Partial<IAddAadharResponseDto>>;
}
