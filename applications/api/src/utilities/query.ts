import { axiosInstance } from '@pbbg/http/lib/utilities/axios';
import type { SuccessResponse } from '@pbbg/http/lib/types/api';

export interface QueryOptions {
  mode?: 'SINGULAR' | 'MULTIPLE';
  query: string;
  variables: string[];
}

export type Query = <T>(options: QueryOptions) => Promise<T>;

export function queryInstance() {
  return async <T>(options: QueryOptions) => {
    const { APP_QUERY_HOST, APP_QUERY_SECRET } = process.env;

    if (!APP_QUERY_HOST) {
      throw new Error('query host not configured');
    }

    if (!APP_QUERY_SECRET) {
      throw new Error('query secret token not configured');
    }

    if (!options.mode) {
      options.mode = 'SINGULAR';
    }

    const endpoint = `${APP_QUERY_HOST}/api/query`;
    const data = JSON.stringify(options);

    const response = await axiosInstance.post<SuccessResponse<T>>(endpoint, data, {
      headers: {
        'Authorization': `Basic: ${APP_QUERY_SECRET}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.data;
  };
}
