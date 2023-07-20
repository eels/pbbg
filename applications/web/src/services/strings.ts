import authentication from '@/web/resources/strings/authentication';
import general from '@/web/resources/strings/general';
import router from '@/web/resources/strings/router';

export const strings = {
  ...authentication,
  ...general,
  ...router,
};

export function assignStringsToStorage() {
  if (typeof window !== 'undefined') {
    window.nextstring = strings;
  }

  if (typeof window === 'undefined') {
    global.nextstring = strings;
  }
}
