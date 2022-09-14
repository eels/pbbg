import Button from 'components/atoms/Button';
import ConditionalRender from 'components/utilities/ConditionalRender';
import LoginForm from 'components/molecules/LoginForm';
import { useAuth } from 'hooks/use-auth';
import { useResourceString } from 'hooks/use-resource-string';
import { withTranslations } from 'src/config/translations';
import type { GetStaticPropsContext } from 'next';

export default function Home() {
  const { handleLogin, handleLogout, user } = useAuth({ guard: 'guest' });
  const { t } = useResourceString();

  return (
    <div>
      <ConditionalRender condition={user === undefined}>
        {() => <LoginForm handleLogin={handleLogin} />}
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
