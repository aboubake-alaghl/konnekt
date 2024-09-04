import axios from 'axios';

const axiosInstance = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_STRAPI_URL || '' });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || error)
);

export default axiosInstance;
