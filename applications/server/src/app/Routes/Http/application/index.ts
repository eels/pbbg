import Route from '@ioc:Adonis/Core/Route';

// --- Application ------------------------------

Route.get('/', () => ({ hello: 'world' }));
