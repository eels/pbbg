import router from 'support/facades/router';
import { ApplicationHandler } from 'http/controllers/application';
import { NotAllowedHandler } from 'http/controllers/not-allowed';

// --- Application ------------------------------

router.create('GET', '/', ApplicationHandler);

// --- Catch all not allowed --------------------

router.create('ALL', '*', NotAllowedHandler);
