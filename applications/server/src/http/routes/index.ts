import app from 'application';
import { ApplicationHandler } from 'http/controllers/application';
import { NotAllowedHandler } from 'http/controllers/not-allowed';

// --- Application ------------------------------

app.get('/', ApplicationHandler);

// --- Catch all not allowed --------------------

app.all('*', NotAllowedHandler);
