import BaseQuery from '@/web/server/lib/query';
import type { User } from '@pbbg/database-types/lib/types';

export default class AuthenticationQuery extends BaseQuery {
  public async authenticate(email: string, password: string) {
    const collection = this.authentication.collection('users');

    return await collection.authWithPassword<User>(email, password);
  }

  public async doesUserExist(email: string) {
    const database = await this.database;
    const collection = database.collection('users');
    const user = await collection.getFirstListItem(`email="${email}"`);

    return user !== null;
  }
}
