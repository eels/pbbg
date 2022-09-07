import 'App/Routes/application/entrypoint';
import 'App/Routes/application/favicon';
import Route from '@ioc:Adonis/Core/Route';

// --- Catch All / Not Allowed ------------------

Route.any('*', 'NotAllowedController.handle');
