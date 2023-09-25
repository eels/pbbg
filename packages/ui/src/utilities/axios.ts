import axios from 'axios';
import { CSRF_HEADER_NAME } from '@pbbg/http/lib/config/constants';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { APIError } from '@pbbg/http/lib/types/api';
import type { CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  timeout: 60000,
};

const fallback: APIError = {
  message: exceptions.INTERNAL_ERROR,
  status: 'ERROR',
};

export const axiosInstance = axios.create(options);

async function getToken() {
  if (process.env.NODE_ENV === 'development') {
    return undefined;
  }

  const [error, response] = await pleaseTryAsync(() => {
    return axiosInstance.get('/api/get/csrf');
  });

  return error || !response.data ? undefined : response.data;
}

axiosInstance.interceptors.request.use(async (config) => {
  const methods = ['delete', 'patch', 'post', 'put'];
  const token = config.method && methods.includes(config.method) ? await getToken() : undefined;

  config.headers.set(CSRF_HEADER_NAME, token);

  return config;
});

axiosInstance.interceptors.response.use(undefined, (error) => {
  return Promise.reject<APIError>(error?.response?.data ?? fallback);
});
