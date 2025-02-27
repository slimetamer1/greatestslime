import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getCurrentUser = async (): Promise<{ username: string } | null> => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token); 
      console.log("Decoded Token:", decodedToken); 
      const userId = decodedToken.user_id;
      if (userId) {
        const response = await api.get(`/api/users/${userId}/`);
        return { username: response.data.username };
      }
    } catch (error) {
      console.error("Failed to decode token or fetch user details:", error);
      return null;
    }
  }
  return null;
};

export default api;