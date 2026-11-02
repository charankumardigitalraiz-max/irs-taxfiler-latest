import apiClient from '../api/client';

export const couponService = {
  // Get all coupons
  getCoupons: async (params = {}) => {
    const response = await apiClient.get('/admin/coupons', { params });
    return response.data;
  },

  // Create a new coupon
  createCoupon: async (data) => {
    const response = await apiClient.post('/admin/coupons', data);
    return response.data;
  },
};


