import Route from '@ioc:Adonis/Core/Route';

// --- Login User -------------------------------

Route.post('/login', 'Authentication/LoginController.handle');

// --- Logout User ------------------------------

Route.post('/logout', 'Authentication/LogoutController.handle');
