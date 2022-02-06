import app from 'application';
import type { Method, Route } from 'types/http';
import type { RequestHandler } from 'express';

function createRouterObject() {
  return {
    create: (method: Method, path: Route, ...handlers: unknown[]) => {
      const sanitisedMethod = method.toLowerCase() as Lowercase<Method>;

      app[sanitisedMethod](path, ...(handlers as RequestHandler[]));
    },
  };
}

const router = createRouterObject();

export default router;
