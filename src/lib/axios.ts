import axios from "axios";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not set");
}

const axiosInstance = (token?: string) => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  // Request interceptor for debugging
  axiosInstance.interceptors.request.use(
    (config) => {
      // console.log('Request:', {
      //     url: config.url,
      //     method: config.method,
      //     headers: config.headers,
      //     params: config.params,
      // });
      return config;
    },
    (error) => {
      // console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for debugging
  axiosInstance.interceptors.response.use(
    (response) => {
      // console.log('Response:', {
      //     status: response.status,
      //     data: response.data,
      //     headers: response.headers,
      // });
      return response;
    },
    (error) => {
      // console.error('Response Error:', {
      //     message: error.message,
      //     status: error.response?.status,
      //     data: error.response?.data,
      //     config: {
      //         url: error.config?.url,
      //         method: error.config?.method,
      //         headers: error.config?.headers,
      //     },
      // });
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
const axiosLocal = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const axiosPython = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_PYTHON,
  headers: {
    "Content-Type": "application/json",
  },
});
export { axiosLocal, axiosPython, axiosInstance };
export default axiosInstance;
