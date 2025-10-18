import multer from "multer";

export interface IStorageService {
  upload: multer.Multer;
}
