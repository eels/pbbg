import type { Record as BaseRecord, RecordAuthResponse } from 'pocketbase';

export type Expand<T, U> = T & { expand: Partial<U> };

export type AuthResponse = RecordAuthResponse<User>;

export interface User extends BaseRecord {
  admin: boolean;
  email: string;
  emailVisibility: boolean;
  name: string;
  username: string;
  verified: boolean;
}
