import Application from '@ioc:Adonis/Core/Application';
import Env from '@ioc:Adonis/Core/Env';
import { driveConfig } from '@adonisjs/core/build/config';

export default driveConfig({
  /*
  |--------------------------------------------------------------------------
  | Default disk
  |--------------------------------------------------------------------------
  |
  | The default disk to use for managing file uploads. The value is driven by
  | the `DRIVE_DISK` environment variable.
  |
  */

  disk: Env.get('DRIVE_DISK'),

  /*
  |--------------------------------------------------------------------------
  | Disks
  |--------------------------------------------------------------------------
  |
  | A collection of disks you want to use within your application. You
  | can switch the disks at runtime using the `Disk.use` method.
  |
  */

  disks: {
    local: {
      basePath: '/uploads',
      driver: 'local',
      root: Application.tmpPath('uploads'),
      serveFiles: true,
      visibility: 'public',
    },
  },
});
