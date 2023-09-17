import axios from 'axios';

export const axiosInstance = axios.create({
  timeout: 60000,
});
