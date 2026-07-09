// utils/api.ts
import axios from 'axios';

// 1. Export the raw BASE_URL for any legacy fetch() calls you still have
// export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend.keywee.in/api/v1/";
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1/";

// 2. Create a pre-configured Axios instance
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 3. Request Interceptor: Automatically attach the token before every request leaves the browser
apiClient.interceptors.request.use(
  (config) => {
    // Check if we are running on the client side (browser)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 4. Response Interceptor: Globally handle API errors
apiClient.interceptors.response.use(
  (response) => {
    // If the request succeeds, just return the response
    return response;
  },
  (error) => {
    // If the server returns a 401 Unauthorized (invalid or expired token)
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        console.warn("Session expired. Redirecting to login...");
        localStorage.removeItem('token');
        window.location.href = '/login'; // Kick the user back to the login screen
      }
    }
    
    return Promise.reject(error);
  }
);