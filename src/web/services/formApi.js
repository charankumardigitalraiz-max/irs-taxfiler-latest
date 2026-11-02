import { baseUrl } from "../../baseurl";

const API_BASE_URL = baseUrl + '/api';
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const submitWebsiteForm = async (formType, formData) => {
  try {
    // Remove formType from formData if it exists to avoid conflicts
    const { formType: _, ...cleanFormData } = formData;
    
    const response = await fetch(`${API_BASE_URL}/forms/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        ...cleanFormData,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit form');
    }

    return data;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};

