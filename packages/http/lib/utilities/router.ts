import { validHTTPRequestMethods } from '@/http/utilities/http';
import { wrapHandler } from '@/http/utilities/wrap';
import type { Express } from 'express';
import type { Router } from '@/http/types/http';

export function createExpressRouter(app: Express) {
  return validHTTPRequestMethods.reduce<Router>((router, method) => {
    router[method] = (path, ...handler) => {
      return app[method](path, ...handler.map((h) => wrapHandler(h.handle)));
    };

    return router;
  }, {} as Router);
}
