import Tesseract from "tesseract.js";
import path from "path";
import { injectable } from "tsyringe";
import { IAddAadharResponseDto } from "../interfaces/Dto/OcrService";
import { IOcrExtractionService } from "../interfaces/IocrExtractionService";

@injectable()
export class OcrExtractionService implements IOcrExtractionService {
  async extractDataFromImage(
    file: Express.Multer.File
  ): Promise<Partial<IAddAadharResponseDto>> {
    try {
      console.log(`Extracting data from image: ${file.originalname}`);

      const imagePath = path.resolve(file.path);

      const result = await Tesseract.recognize(imagePath, "eng");

      const text = result.data.text;
      console.log("Extracted Text:", text);

      const nameMatch = text.match(/Name\s*[:\-]?\s*(.*)/i);
      const dobMatch = text.match(
        /DOB\s*[:\-]?\s*(\d{2}[\/\-]\d{2}[\/\-]\d{4})/i
      );
      const aadharMatch = text.match(/\d{4}\s\d{4}\s\d{4}/);
      const addressMatch = text.match(/Address\s*[:\-]?\s*(.*)/i);

      if (file.originalname.toLowerCase().includes("front")) {
        return {
          name: nameMatch?.[1]?.trim() ?? "",
          dob: dobMatch?.[1]?.trim() ?? "",
          aadharNumber: aadharMatch?.[0]?.trim() ?? "",
        };
      } else {
        return {
          address: addressMatch?.[1]?.trim() ?? "",
        };
      }
    } catch (error) {
      console.error("Error in OCR extraction:", error);
      return {};
    }
  }
}
