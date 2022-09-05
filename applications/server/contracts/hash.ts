import type hashConfig from '../config/hash';
import type { InferListFromConfig } from '@adonisjs/core/build/config';

declare module '@ioc:Adonis/Core/Hash' {
  interface HashersList extends InferListFromConfig<typeof hashConfig> {}
}
