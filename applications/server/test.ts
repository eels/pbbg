/*
|--------------------------------------------------------------------------
| Tests
|--------------------------------------------------------------------------
|
| The contents in this file boots the AdonisJS application and configures
| the Japa tests runner.
|
| For the most part you will never edit this file. The configuration
| for the tests can be controlled via ".adonisrc.json" and
| "tests/bootstrap.ts" files.
|
*/

import 'reflect-metadata';
import sourceMapSupport from 'source-map-support';
import { Ignitor } from '@adonisjs/core/build/standalone';
import { configure, processCliArgs, run } from '@japa/runner';
import type { Config, RunnerHooksHandler } from '@japa/runner';

process.env.NODE_ENV = 'test';

sourceMapSupport.install({ handleUncaughtExceptions: false });

const kernel = new Ignitor(__dirname).kernel('test');

(async () => {
  await kernel.boot();

  const { runnerHooks, ...config } = await import('./tests/bootstrap');
  const app: RunnerHooksHandler[] = [() => kernel.start()];

  const configuration: Config = {
    ...kernel.application.rcFile.tests,
    ...processCliArgs(process.argv.slice(2)),
    ...config,
    cwd: kernel.application.appRoot,
    importer: (filePath) => import(filePath),
    setup: app.concat(runnerHooks.setup),
    teardown: runnerHooks.teardown,
  };

  configure(configuration);
  run();
})();
