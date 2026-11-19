import axios from 'axios';
import { toast } from 'react-toastify';
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
      if (response.data?.success) {
        toast.success(response.data?.message || 'OTP sent successfully to your email');
      } else if (response.data?.message) {
        toast.error(response.data.message);
      }
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'Failed to send OTP. Please try again.';
      toast.error(errorMsg);
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
      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          sessionStorage.setItem('justLoggedIn', 'true');
        }
        toast.success(response.data.message || 'OTP verified successfully!');
      } else if (response.data.message) {
        toast.error(response.data.message);
      }
      return response.data;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        'Failed to verify OTP. Please try again.';
      toast.error(errorMsg);
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
        sessionStorage.setItem('justLoggedIn', 'true');
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
