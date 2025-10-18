import { Document } from "mongoose";

export interface IAdharModel extends Document {
  _id: string;
  dob: string;
  name: string;
  address: string;
  aadharNumber: string;
  createdAt?: string;
  updatedAt?: string;
}
