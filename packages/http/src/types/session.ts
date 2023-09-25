import type { JWTPayload } from 'jose';

export interface Session extends JWTPayload {
  email: string;
}
