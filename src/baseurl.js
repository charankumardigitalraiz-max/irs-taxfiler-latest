// Backend API base URL
export const baseUrl = "https://api.irstaxfiler.com"
// export const baseUrl = "http://192.168.0.180:3001"

// Frontend base URL for referral links and public pages
// Priority: 1. Environment variable, 2. Current window origin, 3. Default production URL
export const getFrontendBaseUrl = () => {
  // Check environment variable first
  if (import.meta.env.VITE_FRONTEND_URL) {
    return import.meta.env.VITE_FRONTEND_URL;
  }
  // Use current window origin if available (browser)
  if (typeof window !== 'undefined' && window.location) {
    return window.location.origin;
  }
  // Fallback to production URL
  return 'https://irstaxfiler.com';
};

// Export as constant for convenience (will be evaluated at runtime)
export const frontendBaseUrl = getFrontendBaseUrl();