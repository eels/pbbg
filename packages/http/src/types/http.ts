import type { ErrorRequestHandler, RequestHandler } from 'express';
import type { validHTTPRequestMethods } from '@/http/utilities/http';

export type AsyncHandler = (...args: Parameters<RequestHandler>) => Promise<void>;
export type AsyncErrorHandler = (...args: Parameters<ErrorRequestHandler>) => Promise<void>;
export type HTTPRequestMethods = typeof validHTTPRequestMethods;
export type HTTPRequestMethod = HTTPRequestMethods[number];
export type Router = Record<HTTPRequestMethod, (path: string, ...handler: AsyncHandler[]) => void>;

export abstract class Controller {
  public TEMPLATE_DO_NOT_IMPLEMENT(...args: Parameters<RequestHandler>) {
    (() => args)();
  }
}
