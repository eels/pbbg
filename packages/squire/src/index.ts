import { createBlogPost } from '@/squire/commands/create-blog-post/index';
import { createComponent } from '@/squire/commands/create-component/index';
import { program } from 'commander';

program.command('create-blog-post').action(createBlogPost);
program.command('create-component').action(createComponent);
program.parse();
