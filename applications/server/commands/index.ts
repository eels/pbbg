import Application from '@ioc:Adonis/Core/Application';
import { listDirectoryFiles } from '@adonisjs/core/build/standalone';

export default listDirectoryFiles(__dirname, Application.appRoot, ['./commands/index']);
