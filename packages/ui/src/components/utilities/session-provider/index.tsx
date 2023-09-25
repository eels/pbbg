import type { ReactNode } from 'react';

export interface SessionProviderProps {
  children: ReactNode;
}

export default function SessionProvider({ children }: SessionProviderProps) {
  return children;
}
