import app from 'application';
import { ApplicationHandler } from 'http/controllers/application';
import { NotAllowedHandler } from 'http/controllers/not-allowed';
import type { Application } from 'express';

// --- Application ------------------------------

app.get('/', <Application>ApplicationHandler);

// --- Catch all not allowed --------------------

app.all('*', <Application>NotAllowedHandler);
