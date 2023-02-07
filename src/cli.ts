import { cac } from 'cac';
import { createDevServer } from './dev';

const cli = cac('clitest');

cli.command('dev', 'start dev server').action(async () => {
  console.log('start dev server');
  createDevServer();
});

cli.help();
cli.parse();
