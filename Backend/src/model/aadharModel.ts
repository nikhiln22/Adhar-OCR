import mongoose, { Schema } from "mongoose";
import { IAdharModel } from "../interfaces/IadharModel";

const aadharSchema = new Schema<IAdharModel>(
  {
    dob: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    aadharNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const aadhar = mongoose.model("aadhar", aadharSchema);
