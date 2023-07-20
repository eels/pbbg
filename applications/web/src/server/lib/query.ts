import type PocketBase from 'pocketbase';

export default class BaseQuery {
  protected authentication: PocketBase;
  protected database: Promise<PocketBase>;

  public constructor(authentication: PocketBase, database: Promise<PocketBase>) {
    this.authentication = authentication;
    this.database = database;
  }
}
