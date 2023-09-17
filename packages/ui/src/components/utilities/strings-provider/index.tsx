'use client';

import { assignStringsToStorage } from '@/ui/services/strings';
import type { ReactNode } from 'react';

export interface StringsProviderProps {
  children: ReactNode;
}

export default function StringsProvider({ children }: StringsProviderProps) {
  assignStringsToStorage();

  return children;
}
