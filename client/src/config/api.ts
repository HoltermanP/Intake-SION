// API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
  PROJECTS: `${API_BASE_URL}/api/forms/projects`,
  PROJECT: (projectNumber: string) => `${API_BASE_URL}/api/forms/projects/${projectNumber}`,
  D2_FORM: (projectNumber: string) => `${API_BASE_URL}/api/forms/d2/${projectNumber}`,
  ELECTRICAL: (projectNumber: string) => `${API_BASE_URL}/api/forms/electrical/${projectNumber}`,
  VALIDATION: (projectNumber: string) => `${API_BASE_URL}/api/forms/validation/${projectNumber}`,
  SHAREPOINT: `${API_BASE_URL}/api/sharepoint`,
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    CALLBACK: `${API_BASE_URL}/api/auth/callback`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`
  }
};

export default API_BASE_URL;
