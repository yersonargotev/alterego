export interface Alternative {
  name: string;
  license: string;
  platforms: string[];
  mainFeatures: string[];
  website: string;
}

export interface AlternativesData {
  projectName: string;
  projectPurpose: string;
  platforms: string[];
  mainFeatures: string[];
  website: string;
  alternatives: Alternative[];
  mostWellKnownAlternative: string[];
  marketPositioning: string;
}
