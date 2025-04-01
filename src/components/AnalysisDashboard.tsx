import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { DetectionResult } from '../types';

interface AnalysisDashboardProps {
  result: DetectionResult;
}

export const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result }) => {
  const getStatusColor = (score: number) => {
    if (score >= 0.8) return 'text-green-500';
    if (score >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatusIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (score >= 0.6) return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    return <XCircle className="w-6 h-6 text-red-500" />;
  };

  return (
    <div className="glass-effect rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
          Analysis Results
        </h2>
        <div className="flex items-center gradient-border px-4 py-2">
          {getStatusIcon(result.authenticity.score)}
          <span className={`ml-2 font-semibold ${getStatusColor(result.authenticity.score)}`}>
            {result.authenticity.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">Security Features</h3>
          <div className="space-y-4">
            {Object.entries(result.features).map(([feature, detected]) => (
              <div key={feature} className="flex items-center justify-between p-3 rounded-lg bg-white bg-opacity-50">
                <span className="text-primary-700 capitalize font-medium">
                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                {detected ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="w-5 h-5" />
                    <span className="ml-2 font-medium">Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <XCircle className="w-5 h-5" />
                    <span className="ml-2 font-medium">Not Found</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-xl font-semibold text-primary-800 mb-4">OCR Analysis</h3>
          <div className="space-y-4">
            {Object.entries(result.ocrResults).map(([key, value]) => (
              key !== 'confidence' && (
                <div key={key} className="p-3 rounded-lg bg-white bg-opacity-50">
                  <span className="text-primary-600 text-sm font-medium capitalize block">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-lg font-semibold text-primary-900 mt-1 block">
                    {value}
                  </span>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="glass-effect rounded-xl p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-primary-800 font-medium">Confidence Score</span>
            <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              {(result.authenticity.score * 100).toFixed(1)}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full animate-gradient bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500"
              style={{ width: `${result.authenticity.score * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};