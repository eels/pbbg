import type User from 'App/Models/User';

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      config: LucidProviderConfig<typeof User>;
      implementation: LucidProviderContract<typeof User>;
    };
  }

  interface GuardsList {
    api: {
      client: SessionClientContract<'user'>;
      config: SessionGuardConfig<'user'>;
      implementation: SessionGuardContract<'user', 'api'>;
    };
  }

  type GuardsListKeys = keyof GuardsList;
}
