import router from 'support/facades/router';
import { LoginHandler } from 'http/controllers/authentication/login';
import { LogoutHandler } from 'http/controllers/authentication/logout';

// --- Authentication ---------------------------

router.create('GET', '/v1/login', LoginHandler);

router.create('GET', '/v1/logout', LogoutHandler);
