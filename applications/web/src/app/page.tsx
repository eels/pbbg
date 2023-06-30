import LoginForm from '@/web/components/molecules/login-form';
import LogoutButton from '@/web/components/atoms/logout-button';
import { getCurrentUser } from '@/web/utilities/session';

export default async function Home() {
  const user = await getCurrentUser();

  return user ? <LogoutButton /> : <LoginForm />;
}
