import axios from "axios";
import { useAuthStore } from "@/stores/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

// Request interceptor – dodaje token
api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor – obsługa 401 globalnie
api.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.code == "ERR_NETWORK") {
      const authStore = useAuthStore();
      authStore.logout();
    }
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response?.status === 401 || error.response?.status === 500 || error.code == "ERR_NETWORK") {
      const authStore = useAuthStore();
      authStore.logout();
    }
    return Promise.reject(error);
  }
);

export default api;
