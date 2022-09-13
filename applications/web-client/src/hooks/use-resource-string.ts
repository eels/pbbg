import { useTranslation } from 'next-i18next';

export function useResourceString(namespace?: string) {
  return useTranslation(namespace);
}
