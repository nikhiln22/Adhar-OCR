import React, { useState, useEffect } from "react";
import { Upload, CheckCircle, Scan, Image } from "lucide-react";

interface UploadComponentProps {
  frontImage: File | null;
  setFrontImage: (file: File | null) => void;
  backImage: File | null;
  setBackImage: (file: File | null) => void;
  handleProcessOCR: () => void;
  loading: boolean;
}

interface ImageUploadCardProps {
  label: string;
  preview: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  side: "front" | "back";
}

export const UploadComponent: React.FC<UploadComponentProps> = ({
  frontImage,
  setFrontImage,
  backImage,
  setBackImage,
  handleProcessOCR,
  loading,
}) => {
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  useEffect(() => {
    if (frontImage) {
      const objectUrl = URL.createObjectURL(frontImage);
      setFrontPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setFrontPreview(null);
    }
  }, [frontImage]);

  useEffect(() => {
    if (backImage) {
      const objectUrl = URL.createObjectURL(backImage);
      setBackPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setBackPreview(null);
    }
  }, [backImage]);

  const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
    label,
    preview,
    onChange,
    id,
    side,
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-300 transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`p-2 rounded-lg ${
            side === "front" ? "bg-blue-100" : "bg-purple-100"
          }`}
        >
          <Image
            className={`w-5 h-5 ${
              side === "front" ? "text-blue-600" : "text-purple-600"
            }`}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
      </div>

      {!preview ? (
        <label
          htmlFor={id}
          className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-400">
              PNG, JPG or JPEG (MAX. 10MB)
            </p>
          </div>
          <input
            id={id}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onChange}
          />
        </label>
      ) : (
        <div className="relative group">
          <img
            src={preview}
            alt={`${label} Preview`}
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center">
            <label
              htmlFor={id}
              className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
            >
              Change Image
            </label>
          </div>
          <input
            id={id}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onChange}
          />
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
            <CheckCircle className="w-5 h-5" />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <ImageUploadCard
        label="Front Side of Aadhaar"
        preview={frontPreview}
        onChange={(e) =>
          setFrontImage(e.target.files ? e.target.files[0] : null)
        }
        id="front-upload"
        side="front"
      />

      <ImageUploadCard
        label="Back Side of Aadhaar"
        preview={backPreview}
        onChange={(e) =>
          setBackImage(e.target.files ? e.target.files[0] : null)
        }
        id="back-upload"
        side="back"
      />

      <button
        onClick={handleProcessOCR}
        disabled={loading || !frontImage || !backImage}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <Scan className="w-6 h-6" />
            Extract Aadhaar Details
          </>
        )}
      </button>
    </div>
  );
};
