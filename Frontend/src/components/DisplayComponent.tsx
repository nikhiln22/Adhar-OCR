import React from "react";
import {
  CheckCircle,
  FileText,
  User,
  Calendar,
  CreditCard,
  MapPin,
} from "lucide-react";
import type {
  DisplayComponentProps,
  DetailRowProps,
} from "../types/component.types";

export const DisplayComponent: React.FC<DisplayComponentProps> = ({
  ocrData,
}) => {
  if (!ocrData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 border-2 border-dashed border-gray-300 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gray-100 p-6 rounded-full mb-6">
            <FileText className="w-16 h-16 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Details Extracted Yet
          </h3>
          <p className="text-gray-500 max-w-md">
            Upload both front and back images of the Aadhaar card and click
            "Extract Aadhaar Details" to see the information here.
          </p>
        </div>
      </div>
    );
  }

  const DetailRow: React.FC<DetailRowProps> = ({
    label,
    value,
    icon: Icon,
  }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="flex-shrink-0 mt-1">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-base font-semibold text-gray-900 break-words">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-green-100 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white bg-opacity-20 rounded-lg">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              Extraction Complete
            </h3>
            <p className="text-green-50 text-sm">
              Aadhaar details successfully extracted
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <DetailRow label="Full Name" value={ocrData.name} icon={User} />
        <DetailRow label="Date of Birth" value={ocrData.dob} icon={Calendar} />
        <DetailRow label="Gender" value={ocrData.gender} icon={User} />
        <DetailRow
          label="Aadhaar Number"
          value={ocrData.aadharNumber}
          icon={CreditCard}
        />
        <DetailRow label="Address" value={ocrData.address} icon={MapPin} />
      </div>
    </div>
  );
};
