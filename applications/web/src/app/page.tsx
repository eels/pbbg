import { getCurrentUser } from '@/web/utilities/session';

export default async function Home() {
  const user = await getCurrentUser();

  return <div>{user?.name}</div>;
}
