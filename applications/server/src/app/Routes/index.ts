import 'App/Routes/application/entrypoint';
import 'App/Routes/authentication';
import Route from '@ioc:Adonis/Core/Route';

// --- Catch All / Not Allowed ------------------

Route.any('*', 'NotAllowedController.handle');
