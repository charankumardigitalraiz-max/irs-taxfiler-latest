import { baseUrl } from "../../baseurl";

const API_BASE_URL = baseUrl + '/api';
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Get referral code for logged-in user
export const getMyReferral = async () => {
  try {
    const token = localStorage.getItem('token') || localStorage.getItem('authToken');
    if (!token) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${API_BASE_URL}/client/referrals`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch referral code');
    }

    return data;
  } catch (error) {
    console.error('Error fetching referral:', error);
    throw error;
  }
};

