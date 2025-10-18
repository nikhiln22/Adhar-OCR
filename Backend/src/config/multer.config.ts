import multer from "multer";
import path from "path";
import fs from "fs";
import { IStorageService } from "../interfaces/IstorageService";

export class LocalUpload implements IStorageService {
  private uploadPath: string;
  public upload: multer.Multer;

  constructor() {
    this.uploadPath = path.resolve(__dirname, "../../uploads");

    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
      console.log(`Created upload directory: ${this.uploadPath}`);
    }

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadPath);
      },
      filename: (req, file, cb) => {
        const safeOriginalName = file.originalname.replace(/\s/g, "-");
        const uniqueName = `${Date.now()}-${safeOriginalName}`;
        cb(null, uniqueName);
      },
    });

    this.upload = multer({ storage });
  }
}
