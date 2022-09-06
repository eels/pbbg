import { BaseCommand } from '@adonisjs/core/build/standalone';

export default class Example extends BaseCommand {
  public static commandName = 'example';

  public static description = 'Runs the generated example command';

  public static settings = {
    loadApp: false,
    stayAlive: false,
  };

  public async run() {
    this.logger.info('Hello world!');
  }
}
