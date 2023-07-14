import general from '@/web/resources/strings/general';

export const strings = {
  ...general,
};

export function assignStringsToStorage() {
  if (typeof window !== 'undefined') {
    window.nextstring = strings;
  }

  if (typeof window === 'undefined') {
    global.nextstring = strings;
  }
}
