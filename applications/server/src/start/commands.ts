import Application from '@ioc:Adonis/Core/Application';
import path from 'path';
import { listDirectoryFiles } from '@adonisjs/core/build/standalone';

export default listDirectoryFiles(path.resolve(__dirname, '../commands'), Application.appRoot);
