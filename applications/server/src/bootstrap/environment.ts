import path from 'path';
import { config } from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  config({ path: path.resolve('../../', '.env') });
}
