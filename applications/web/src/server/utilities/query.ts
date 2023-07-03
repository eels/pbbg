import { axiosInstance } from '@/web/server/utilities/axios';
import type { SuccessResponse } from '@pbbg/http/lib/types/api';

export interface QueryOptions {
  mode?: 'SINGULAR' | 'MULTIPLE';
  query: string;
  variables: string[];
}

export type Query = <T>(options: QueryOptions) => Promise<T>;

export async function queryInstance<T>(options: QueryOptions) {
  const { APP_QUERY_SECRET, APP_QUERY_URL } = process.env;

  if (!APP_QUERY_URL) {
    throw new Error('query host not configured');
  }

  if (!APP_QUERY_SECRET) {
    throw new Error('query secret token not configured');
  }

  if (!options.mode) {
    options.mode = 'SINGULAR';
  }

  const endpoint = `${APP_QUERY_URL}/api/query`;
  const data = JSON.stringify(options);

  const response = await axiosInstance.post<SuccessResponse<T>>(endpoint, data, {
    headers: {
      'Authorization': `Basic: ${APP_QUERY_SECRET}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.data;
}
