import axios from 'axios';
import useAuthStore from '../store/authStore';
import { showSuccess, showError } from '../utils/toast';
import { baseUrl } from '../../baseurl';

const API_BASE_URL = baseUrl + '/api';
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token and handle FormData
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // If data is FormData, remove Content-Type header so axios can set it automatically with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors and show toasts
apiClient.interceptors.response.use(
  (response) => {
    // Show success toast for POST, PUT, PATCH, DELETE requests (only if message exists)
    if (['post', 'put', 'patch', 'delete'].includes(response.config.method?.toLowerCase())) {
      const message = response.data?.message;
      if (message && response.data?.success !== false) {
        showSuccess(message, { duration: 3000 });
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      showError('Session expired. Please login again.', { duration: 4000 });
      useAuthStore.getState().logout();
      setTimeout(() => {
        window.location.href = '/admin/login';
      }, 1500);
    } else {
      // Show error toast - check multiple possible error message locations
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error ||
        error.message || 
        'An error occurred. Please try again.';
      
      showError(errorMessage, { duration: 5000 });
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;

