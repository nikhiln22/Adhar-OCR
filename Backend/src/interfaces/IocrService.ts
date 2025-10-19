import { IAddAadharResponseDto } from "./Dto/OcrService";

export interface IAadharOcrService {
  addAadhar(files: Express.Multer.File[]): Promise<{
    success: boolean;
    message: string;
    data?: IAddAadharResponseDto;
  }>;
}
