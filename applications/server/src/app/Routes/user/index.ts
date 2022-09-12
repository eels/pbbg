import Route from '@ioc:Adonis/Core/Route';

// --- User -------------------------------------

Route.get('/user', 'User/UserController.handle').middleware('auth');
