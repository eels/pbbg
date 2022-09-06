import 'App/Routes/Http/application';
import Route from '@ioc:Adonis/Core/Route';

// --- Favicon ----------------------------------

Route.get('/favicon.ico', 'FaviconController.handle');

// --- Catch All / Not Allowed ------------------

Route.any('*', 'NotFoundController.handle');
