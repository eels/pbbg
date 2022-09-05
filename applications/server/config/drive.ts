import Application from '@ioc:Adonis/Core/Application';
import Env from '@ioc:Adonis/Core/Env';
import { driveConfig } from '@adonisjs/core/build/config';

/*
|--------------------------------------------------------------------------
| Drive Config
|--------------------------------------------------------------------------
|
| The `DriveConfig` relies on the `DisksList` interface which is
| defined inside the `contracts` directory.
|
*/

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

  disks: {
    /*
    |--------------------------------------------------------------------------
    | Local
    |--------------------------------------------------------------------------
    |
    | Uses the local file system to manage files. Make sure to turn off serving
    | files when not using this disk.
    |
    */

    local: {
      /*
      |--------------------------------------------------------------------------
      | Base path - Local driver only
      |--------------------------------------------------------------------------
      |
      | Base path is always required when "serveFiles = true". Also make sure
      | the `basePath` is unique across all the disks using "local" driver and
      | you are not registering routes with this prefix.
      |
      */

      basePath: '/uploads',

      driver: 'local',

      /*
      |--------------------------------------------------------------------------
      | Storage root - Local driver only
      |--------------------------------------------------------------------------
      |
      | Define an absolute path to the storage directory from where to read the
      | files.
      |
      */
      root: Application.tmpPath('uploads'),

      /*
      |--------------------------------------------------------------------------
      | Serve files - Local driver only
      |--------------------------------------------------------------------------
      |
      | When this is set to true, AdonisJS will configure a files server to serve
      | files from the disk root. This is done to mimic the behavior of cloud
      | storage services that has inbuilt capabilities to serve files.
      |
      */
      serveFiles: true,

      visibility: 'public',
    },
  },
});
