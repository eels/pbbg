import { assignStringsToStorage } from '@/ui/services/strings';
import type { ReactNode } from 'react';

export interface StringsProviderProps {
  children: ReactNode;
}

assignStringsToStorage();

export default function StringsProvider({ children }: StringsProviderProps) {
  return children;
}
