import React, { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisDashboard } from './components/AnalysisDashboard';
import { Shield } from 'lucide-react';
import type { AnalysisImage, DetectionResult } from './types';

function App() {
  const [images, setImages] = useState<AnalysisImage[]>([]);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const analyzeImages = async () => {
    const mockResult: DetectionResult = {
      confidence: 0.85,
      features: {
        hologram: true,
        securitySeal: true,
        uvPatterns: false
      },
      ocrResults: {
        manufacturingDate: '2024-01',
        expiryDate: '2026-01',
        batchNumber: 'B123456',
        confidence: 0.92
      },
      authenticity: {
        score: 0.85,
        status: 'genuine'
      }
    };
    
    setResult(mockResult);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      <header className="glass-effect shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="animate-float p-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="ml-4 text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              MEDIKNOW
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section className="glass-effect rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-primary-800 mb-6">
              Upload Medicine Images
            </h2>
            <ImageUploader onImagesSelected={setImages} />
          </section>

          {images.length > 0 && (
            <section className="glass-effect rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-primary-800">
                  Uploaded Images ({images.length})
                </h2>
                <button
                  onClick={analyzeImages}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:from-primary-600 hover:to-accent-600 transition-all transform hover:scale-105 shadow-lg"
                >
                  Analyze Images
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg transform -rotate-1 group-hover:rotate-0 transition-transform"></div>
                    <div className="relative">
                      <img
                        src={image.url}
                        alt={`Medicine ${image.type}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md transform transition-transform group-hover:scale-[1.02]"
                      />
                      <span className="absolute top-2 left-2 glass-effect px-3 py-1 rounded-full text-sm font-medium text-primary-800">
                        {image.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {result && (
            <section>
              <AnalysisDashboard result={result} />
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
