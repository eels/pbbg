import LoginForm from '@/ui/components/molecules/login-form';
import { handleOnLogin, handleOnRedirect } from '@/ui/services/authentication';

export default function AuthenticationForms() {
  return <LoginForm onLogin={handleOnLogin} onRedirect={handleOnRedirect} />;
}
