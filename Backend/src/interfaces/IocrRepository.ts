import { IAdharModel } from "./IadharModel";
import { IAddAadharRequestDto } from "../interfaces/Dto/OcrService";

export interface IAadharOcrRepository {
  addAadhar(data: IAddAadharRequestDto): Promise<IAdharModel | null>;
}
