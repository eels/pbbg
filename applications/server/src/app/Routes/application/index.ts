import Route from '@ioc:Adonis/Core/Route';

// --- Application ------------------------------

Route.get('/', 'Application/EntrypointController.handle');
