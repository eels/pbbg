import type driveConfig from 'Config/drive';
import type { InferDisksFromConfig } from '@adonisjs/core/build/config';

declare module '@ioc:Adonis/Core/Drive' {
  interface DisksList extends InferDisksFromConfig<typeof driveConfig> {}
}
