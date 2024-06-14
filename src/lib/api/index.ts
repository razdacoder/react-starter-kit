import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_FRONTEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

interface CustomAxiosConfig extends InternalAxiosRequestConfig {
  _retry: boolean;
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosConfig;
    if (
      error.response?.status === 401 ||
      (error.response?.status === 400 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      try {
        await axios.post(
          `${import.meta.env.VITE_FRONTEND_URL}/auth/jwt/refresh/`,
          undefined,
          { withCredentials: true, withXSRFToken: true }
        );
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
