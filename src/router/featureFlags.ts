interface FeatureFlags {
  [key: string]: boolean;
}

declare global {
  interface Window {
    RUNTIME_CONFIG: {
      FEATURE_FLAGS: FeatureFlags;
    };
  }
}

export const useFeatures = (feature: keyof FeatureFlags): boolean => {
  const features = window.RUNTIME_CONFIG?.FEATURE_FLAGS;
  if (!features) {
    console.warn('Feature flags are not defined in RUNTIME_CONFIG');
    return false;
  }
  return features[feature] || false;
};