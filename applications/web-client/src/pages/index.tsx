import Button from 'components/atoms/Button';
import ConditionalRender from 'components/utilities/ConditionalRender';
import EmailInput from 'components/atoms/Input/variations/email';
import Form from 'components/atoms/Form';
import PasswordInput from 'components/atoms/Input/variations/password';
import { useAuth } from 'hooks/use-auth';
import { useRef } from 'react';
import { useResourceString } from 'hooks/use-resource-string';
import { withTranslations } from 'src/config/translations';
import type { FormEvent } from 'react';
import type { GetStaticPropsContext } from 'next';

export default function Home() {
  const { handleLogin, handleLogout, user } = useAuth({ guard: 'guest' });
  const { t } = useResourceString();

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
      <ConditionalRender condition={user === undefined}>
        {() => (
          <Form onSubmit={handleSubmit}>
            <EmailInput ref={email} label={t('auth:form.login_label_email')} />
            <PasswordInput ref={password} label={t('auth:form.login_label_password')} />
            <Button>{t('auth:button.login')}</Button>
          </Form>
        )}
      </ConditionalRender>

      <ConditionalRender condition={user !== undefined}>
        {() => <Button onClick={handleLogout}>{t('auth:button.logout')}</Button>}
      </ConditionalRender>
    </div>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return await withTranslations(locale);
}
