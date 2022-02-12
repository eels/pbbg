import type { Response as ExpressResponse } from 'express';

export type { NextFunction, Request } from 'express';

export type Method = 'ALL' | 'DELETE' | 'GET' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT';

export type Route = string;

export type StatusCode = 200 | 401 | 403 | 429 | 500;

export type Status = 'ERROR' | 'FORBIDDEN' | 'RATE-LIMITED' | 'SUCCESS' | 'UNAUTHORISED';

export interface HTTPResponseOptions {
  data?: Record<string, any>;
  message?: string;
}

export interface Response extends ExpressResponse {
  buildHttpResponse: (status: Status, options?: HTTPResponseOptions) => void;
}
