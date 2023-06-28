import { app } from '@/web/server/utilities/application';
import { validHTTPRequestMethods } from '@/web/server/utilities/http';
import { wrapHandler } from '@/web/server/utilities/wrap';
import type { Router } from '@/web/types/http';

export const router = validHTTPRequestMethods.reduce<Router>((router, method) => {
  router[method] = (path, handler) => app[method](path, wrapHandler(handler));

  return router;
}, {} as Router);
