import Server from '@ioc:Adonis/Core/Server';

Server.middleware.register([
  () => import('App/Middleware/IgnoreFavicon'),
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('App/Middleware/SilentAuth'),
]);

Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  throttle: () => import('@adonisjs/limiter/build/throttle'),
});
