import type { LucideIcon } from "lucide-react";
import type { IAadhar } from "../Model/aadhar";

export interface UploadComponentProps {
  frontImage: File | null;
  setFrontImage: (file: File | null) => void;
  backImage: File | null;
  setBackImage: (file: File | null) => void;
  handleProcessOCR: () => void;
  loading: boolean;
}

export interface ImageUploadCardProps {
  label: string;
  preview: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
  id: string;
  side: "front" | "back";
}

export interface DisplayComponentProps {
  ocrData: IAadhar | null;
}

export interface DetailRowProps {
  label: string;
  value: string;
  icon: LucideIcon;
}
