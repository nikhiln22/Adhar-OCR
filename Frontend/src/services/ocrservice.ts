import axios from "axios";
import type { IAadhar } from "../Model/aadhar";

const BASE_URL = import.meta.env.VITE_API_URL;

export const processAadhaarOCR = async (
  frontImage: File,
  backImage: File
): Promise<IAadhar> => {
  const formData = new FormData();
  formData.append("files", frontImage);
  formData.append("files", backImage);

  const response = await axios.post(`${BASE_URL}/ocr`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.data;
};
