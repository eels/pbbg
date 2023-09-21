import { axiosInstance } from '@pbbg/http/lib/utilities/axios';
import { exceptions } from '@pbbg/http/lib/utilities/response';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { APIContext } from 'astro';
import type { APIResponse } from '@pbbg/http/lib/types/api';
import type { AxiosError, AxiosResponse } from 'axios';

export async function ALL({ request }: APIContext) {
  const { pathname } = new URL(request.url);
  const { headers, json, method } = request;

  const [error, response] = await pleaseTryAsync<AxiosResponse, AxiosError>(async () => {
    const [error, body] = await pleaseTryAsync(() => json());

    return axiosInstance({
      data: !error ? body : undefined,
      headers: Object.fromEntries(headers),
      method,
      url: new URL(pathname, process.env.APP_API_HOST).toString(),
    });
  });

  const unavailable = {
    message: exceptions.SERVICE_UNAVAILABLE,
    status: 'ERROR',
  } satisfies APIResponse<unknown>;

  const fallback = {
    message: exceptions.INTERNAL_ERROR,
    status: 'ERROR',
  } satisfies APIResponse<unknown>;

  if (error?.code === 'ECONNREFUSED') {
    error.response = error.response ?? Object.create({});
    error.response!.data = unavailable;
    error.response!.status = 503;
  }

  const value = error ? error.response : response;

  return new Response(JSON.stringify(value?.data ?? fallback), {
    status: value?.status ?? 500,
  });
}
