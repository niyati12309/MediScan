export interface DetectionResult {
  confidence: number;
  features: {
    hologram: boolean;
    securitySeal: boolean;
    uvPatterns: boolean;
  };
  ocrResults: {
    manufacturingDate: string;
    expiryDate: string;
    batchNumber: string;
    confidence: number;
  };
  authenticity: {
    score: number;
    status: 'genuine' | 'suspicious' | 'counterfeit';
  };
}

export interface AnalysisImage {
  id: string;
  type: 'front' | 'back' | 'uv' | 'hologram';
  url: string;
}