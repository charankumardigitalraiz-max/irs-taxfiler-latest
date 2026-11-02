import axios from 'axios';
import {baseUrl} from '../../baseurl';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const API_BASE_URL = baseUrl + '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout for API calls
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/client/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  // Send OTP to email
  sendOTP: async (email) => {
    try {
      const response = await apiClient.post('/client/auth/send-otp', { email });
      return response.data;
    } catch (error) {
      // If error response has data, return it so components can handle it
      if (error.response?.data) {
        return error.response.data;
      }
      // Otherwise throw the error
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const response = await apiClient.post('/client/auth/verify-otp', { email, otp });
      if (response.data.success && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // If error response has data, return it so components can handle it
      if (error.response?.data) {
        return error.response.data;
      }
      // Otherwise throw the error
      throw error;
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/client/auth/register', userData);
      if (response.data.success && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // If error response has data, return it so components can handle it
      if (error.response?.data) {
        return error.response.data;
      }
      // Otherwise throw the error
      throw error;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export { apiClient };
