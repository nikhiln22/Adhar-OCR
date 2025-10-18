import React, { useState } from "react";
import { UploadComponent } from "../components/UploadComponent";
import { DisplayComponent } from "../components/DisplayComponent";
import { processAadhaarOCR } from "../services/ocrservice";
import type { IAadhar } from "../Model/aadhar";
import { Scan } from "lucide-react";

export const AadhaarOCRPage: React.FC = () => {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [ocrData, setOcrData] = useState<IAadhar | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcessOCR = async () => {
    if (!frontImage || !backImage) {
      alert("Please upload both images!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await processAadhaarOCR(frontImage, backImage);
      setOcrData(data);
    } catch (err: any) {
      console.error("OCR processing error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to process Aadhaar OCR. Please try again."
      );
      alert("Failed to process Aadhaar OCR. Please try again.");
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
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Upload both sides of your Aadhaar card to extract information
            instantly using advanced OCR technology
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

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

        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Important Information
          </h4>
          <ul className="text-sm text-blue-800 space-y-1 ml-7">
            <li>• Ensure both images are clear and readable</li>
            <li>• Supported formats: PNG, JPG, JPEG</li>
            <li>• Your data is processed securely and not stored</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
