import React, { useState, useEffect } from "react";
import { Upload, Scan, Image, X } from "lucide-react";
import type {
  UploadComponentProps,
  ImageUploadCardProps,
} from "../types/component.types";

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
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setFrontPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(frontImage);
    } else {
      setFrontPreview(null);
    }
  }, [frontImage]);

  useEffect(() => {
    if (backImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setBackPreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(backImage);
    } else {
      setBackPreview(null);
    }
  }, [backImage]);

  const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
    label,
    preview,
    onChange,
    onRemove,
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
        <div className="relative">
          <div className="w-full h-48 rounded-lg border-2 border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden p-2">
            <img
              src={preview}
              alt={`${label} Preview`}
              className="max-w-full max-h-full w-auto h-auto object-contain"
            />
          </div>

          <button
            onClick={onRemove}
            className="absolute -top-2 -left-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-colors z-10"
            type="button"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>

          <input
            id={id}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onChange}
          />
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
        onRemove={() => setFrontImage(null)}
        id="front-upload"
        side="front"
      />

      <ImageUploadCard
        label="Back Side of Aadhaar"
        preview={backPreview}
        onChange={(e) =>
          setBackImage(e.target.files ? e.target.files[0] : null)
        }
        onRemove={() => setBackImage(null)}
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
