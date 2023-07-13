import type { Session } from 'next-auth';

const now = new Date();

export const mockSessionObject: Session = {
  expires: now.toISOString(),
  user: {
    email: 'example@example.local',
    name: 'john doe',
  },
};
