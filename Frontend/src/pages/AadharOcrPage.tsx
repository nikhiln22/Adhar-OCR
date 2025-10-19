import React, { useState } from "react";
import { UploadComponent } from "../components/UploadComponent";
import { DisplayComponent } from "../components/DisplayComponent";
import { processAadhaarOCR } from "../services/ocrservice";
import type { IAadhar } from "../Model/aadhar";
import { Scan } from "lucide-react";
import { toast } from "sonner";

export const AadhaarOCRPage: React.FC = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [ocrData, setOcrData] = useState<IAadhar | null>(null);
  const [loading, setLoading] = useState(false);

  const handleProcessOCR = async () => {
    if (!frontImage || !backImage) {
      toast.error("Please upload both images!");
      return;
    }

    setLoading(true);

    try {
      const data = await processAadhaarOCR(frontImage, backImage);
      setOcrData(data);
      toast.success("Aadhaar details extracted successfully!");
    } catch (err) {
      console.error("OCR processing error:", err);
      toast.error("Failed to process Aadhaar OCR. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Scan className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Aadhaar Details Scanner
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <UploadComponent
              frontImage={frontImage}
              setFrontImage={setFrontImage}
              backImage={backImage}
              setBackImage={setBackImage}
              handleProcessOCR={handleProcessOCR}
              loading={loading}
            />
          </div>

          <div>
            <DisplayComponent ocrData={ocrData} />
          </div>
        </div>
      </div>
    </div>
  );
};
