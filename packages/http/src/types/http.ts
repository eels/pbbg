import type { Handler } from 'hono';

export type AsyncHandler = (...args: Parameters<Handler>) => Promise<Response | void>;

export abstract class Controller {
  public TEMPLATE_DO_NOT_IMPLEMENT(...args: Parameters<Handler>) {
    (() => args)();
  }
}
