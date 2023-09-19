import authentication from '@/ui/resources/strings/authentication';
import general from '@/ui/resources/strings/general';
import router from '@/ui/resources/strings/router';

export const strings = {
  ...authentication,
  ...general,
  ...router,
};

export function assignStringsToStorage() {
  if (typeof window !== 'undefined') {
    window.pbbgstring = strings;
  }

  if (typeof window === 'undefined') {
    global.pbbgstring = strings;
  }
}
