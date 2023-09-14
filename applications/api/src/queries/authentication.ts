import BaseQuery from '@/api/lib/query';
import { pleaseTryAsync } from '@pbbg/utilities/lib/try';
import type { User } from '@pbbg/database-types/lib/types';

export default class AuthenticationQuery extends BaseQuery {
  public async authenticate(email: string, password: string) {
    const collection = this.authentication.collection('users');

    return await collection.authWithPassword<User>(email, password);
  }

  public async createUser(email: string, password: string) {
    const database = await this.database;
    const collection = database.collection('users');

    return collection.create<User>({
      email: email.toLowerCase(),
      password,
      passwordConfirm: password,
    });
  }

  public async doesUserExist(email: string) {
    const database = await this.database;
    const collection = database.collection('users');

    const [error, user] = await pleaseTryAsync(() => {
      return collection.getFirstListItem(`email="${email}"`);
    });

    return error === null || user !== null;
  }
}
