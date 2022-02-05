import app from 'application';
import { NotAllowedHandler } from 'http/controllers/not-allowed';

// --- Catch all not allowed --------------------

app.all('*', NotAllowedHandler);
