import app from 'application';
import type { Method, RequestHandler, Route } from 'types/http';

function createRouterObject() {
  return {
    create: (method: Method, path: Route, ...handlers: RequestHandler[]) => {
      const sanitisedMethod = method.toLowerCase() as Lowercase<Method>;

      app[sanitisedMethod](path, ...(handlers as any[]));
    },
  };
}

const router = createRouterObject();

export default router;
