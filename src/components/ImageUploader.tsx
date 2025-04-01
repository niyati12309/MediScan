import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Camera, X, Sun, Sparkles } from 'lucide-react';
import Webcam from 'react-webcam';
import type { AnalysisImage } from '../types';

interface ImageUploaderProps {
  onImagesSelected: (images: AnalysisImage[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedType, setSelectedType] = useState<'front' | 'back' | 'uv' | 'hologram'>('front');
  const [isUVMode, setIsUVMode] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const images: AnalysisImage[] = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substring(7),
      type: selectedType,
      url: URL.createObjectURL(file),
    }));
    onImagesSelected(images);
  }, [onImagesSelected, selectedType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: true
  });

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const images: AnalysisImage[] = [{
          id: Math.random().toString(36).substring(7),
          type: isUVMode ? 'uv' : selectedType,
          url: imageSrc,
        }];
        onImagesSelected(images);
        setShowCamera(false);
        setIsUVMode(false);
      }
    }
  }, [onImagesSelected, selectedType, isUVMode]);

  const imageTypes = [
    { value: 'front', label: 'Front View', icon: Sun },
    { value: 'back', label: 'Back View', icon: Sun },
    { value: 'uv', label: 'UV Pattern', icon: Sparkles },
    { value: 'hologram', label: 'Hologram', icon: Sparkles },
  ] as const;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!showCamera && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-primary-800 mb-2">
            Select Image Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {imageTypes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setSelectedType(value)}
                className={`p-3 rounded-lg flex flex-col items-center justify-center transition-all ${
                  selectedType === value
                    ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-primary-600 hover:bg-primary-50'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {showCamera ? (
        <div className="relative">
          <div className="glass-effect rounded-2xl p-4 relative">
            <div className="absolute top-2 right-2 z-10 flex gap-2">
              <button
                onClick={() => setIsUVMode(!isUVMode)}
                className={`p-2 rounded-full ${
                  isUVMode 
                    ? 'bg-accent-500 text-white'
                    : 'bg-gray-500 text-white'
                } hover:opacity-90 transition-colors`}
              >
                <Sparkles className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setShowCamera(false);
                  setIsUVMode(false);
                }}
                className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className={`w-full rounded-lg ${isUVMode ? 'filter hue-rotate-180 contrast-125' : ''}`}
            />
            <button
              onClick={capture}
              className="mt-4 w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105 shadow-lg"
            >
              <Camera className="w-5 h-5 mr-2" />
              Capture {isUVMode ? 'UV Pattern' : selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
            </button>
          </div>
        </div>
      ) : (
        <>
          <div
            {...getRootProps()}
            className={`gradient-border p-8 text-center cursor-pointer transition-all transform hover:scale-[1.01]
              ${isDragActive ? 'bg-primary-50' : 'bg-white'}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500">
                <Upload className="w-12 h-12 text-white animate-float" />
              </div>
              <div>
                <p className="text-xl font-medium text-primary-800">
                  Drop your {selectedType} images here, or click to select
                </p>
                <p className="text-sm text-primary-600 mt-2">
                  Selected type: {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              className="flex items-center px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105 shadow-lg"
              onClick={() => setShowCamera(true)}
            >
              <Camera className="w-5 h-5 mr-2" />
              Use Camera
            </button>
          </div>
        </>
      )}
    </div>
  );
};