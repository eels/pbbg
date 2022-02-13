import 'http/routes/application';
import 'http/routes/authentication';
import router from 'support/facades/router';
import { NotAllowedHandler } from 'http/controllers/not-allowed';

// --- Catch all not allowed --------------------

router.create('ALL', '*', NotAllowedHandler);
