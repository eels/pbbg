import type User from 'App/Models/User';

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      config: LucidProviderConfig<typeof User>;
      implementation: LucidProviderContract<typeof User>;
    };
  }

  interface GuardsList {
    web: {
      client: SessionClientContract<'user'>;
      config: SessionGuardConfig<'user'>;
      implementation: SessionGuardContract<'user', 'web'>;
    };
  }

  type GuardsListKeys = keyof GuardsList;
}
