import { Model } from "mongoose";
import { IAddAadharRequestDto } from "../interfaces/Dto/OcrService";
import { IAdharModel } from "../interfaces/IadharModel";
import { IAadharOcrRepository } from "../interfaces/IocrRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class AadharOcrRepository implements IAadharOcrRepository {
  constructor(
    @inject("IAdharModel") private _aadharModel: Model<IAdharModel>
  ) {}

  async addAadhar(data: IAddAadharRequestDto): Promise<IAdharModel | null> {
    try {
      console.log("Entered into the Aadhaar OCR repository addAadhar function");

      const savedData = await this._aadharModel.create(data);

      console.log("Aadhaar details saved successfully:", savedData);

      return savedData;
    } catch (error) {
      console.error("Error in repository addAadhar:", error);
      return null;
    }
  }
}
