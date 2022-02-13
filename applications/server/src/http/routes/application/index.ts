import router from 'support/facades/router';
import { ApplicationEntrypointHandler } from 'http/controllers/application/entrypoint';

// --- Application ------------------------------

router.create('GET', '/', ApplicationEntrypointHandler);
