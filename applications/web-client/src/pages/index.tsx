import Button from 'components/atoms/Button';
import Form from 'components/atoms/Form';
import Input from 'components/atoms/Input';
import { useAuth } from 'hooks/use-auth';
import { useRef } from 'react';
import type { FormEvent } from 'react';

export default function Home() {
  const { handleLogin, handleLogout } = useAuth({ guard: 'guest' });
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (email.current && password.current) {
      handleLogin({
        email: email.current.value,
        password: password.current.value,
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input ref={email} autoComplete='email' label='Email' type='email' />
        <Input ref={password} autoComplete='current-password' label='Password' type='password' />
        <Button>Login</Button>
      </Form>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
