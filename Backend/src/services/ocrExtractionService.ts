import Tesseract from "tesseract.js";
import { injectable } from "tsyringe";
import { IAddAadharResponseDto } from "../interfaces/Dto/OcrService";
import { IOcrExtractionService } from "../interfaces/IocrExtractionService";

@injectable()
export class OcrExtractionService implements IOcrExtractionService {
  private async extractTextFromImage(
    file: Express.Multer.File
  ): Promise<string> {
    try {
      const {
        data: { text },
      } = await Tesseract.recognize(file.buffer || file.path, "eng");
      return text;
    } catch (error) {
      console.error("Error during OCR:", error);
      throw error;
    }
  }

  private cleanText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
  }

  private extractAadhaarInfo(
    frontText: string,
    backText: string
  ): IAddAadharResponseDto {
    const cleanFrontText = this.cleanText(frontText);
    const cleanBackText = this.cleanText(backText);

    console.log("Clean Front Text:", cleanFrontText);
    console.log("Clean Back Text:", cleanBackText);

    const dob =
      cleanFrontText.match(/DOB:\s*(\d{2}\/\d{2}\/\d{4})/i)?.[1] ?? "";

    const aadharNumber = cleanFrontText.match(/(\d{12})/)?.[1] ?? "";

    const gender = cleanFrontText.match(/\b(Male|Female)\b/i)?.[1] ?? "";

    const name =
      frontText
        .match(/\d+\s+([A-Z][a-z]+\s+[A-Z][a-z]*)\s*[;,]/)?.[1]
        ?.trim() ?? "";

    const addressMatch = cleanBackText.match(/Address:\s*(.+?\d{6})/is);
    const address =
      addressMatch?.[1]
        ?.replace(/[^\w\s,.-]/g, "")
        .replace(/\s+/g, " ")
        .trim() ?? "";

    console.log("Extracted Info:", {
      name,
      dob,
      aadharNumber,
      gender,
      address,
    });

    return {
      name,
      dob,
      aadharNumber,
      gender,
      address,
    };
  }

  async extractBothImages(
    frontFile: Express.Multer.File,
    backFile: Express.Multer.File
  ): Promise<IAddAadharResponseDto> {
    try {
      console.log("Processing both front and back images");

      const frontText = await this.extractTextFromImage(frontFile);
      const backText = await this.extractTextFromImage(backFile);

      console.log("Front Text:", frontText);
      console.log("Back Text:", backText);

      const aadhaarInfo = this.extractAadhaarInfo(frontText, backText);

      return aadhaarInfo;
    } catch (error) {
      console.error("Error extracting both images:", error);
      throw error;
    }
  }
}
