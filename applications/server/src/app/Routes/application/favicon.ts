import 'App/Routes/application/entrypoint';
import Route from '@ioc:Adonis/Core/Route';

// --- Favicon ----------------------------------

Route.get('/favicon.ico', 'FaviconController.handle');
