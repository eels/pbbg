import cc from 'classcat';
import { excelsior, roboto } from '@/web/config/fonts';
import type { PartialStoryFn } from '@storybook/types';
import type { ReactRenderer } from '@storybook/react';

export function withStorybookDecorator() {
  const icons = process.env.STATIC_ICONS;

  return function StoryblokDecorator(Story: PartialStoryFn<ReactRenderer>) {
    return (
      <div className={cc([excelsior.variable, roboto.variable])}>
        <div dangerouslySetInnerHTML={{ __html: icons ?? '' }} id='__icons' />
        <Story />
      </div>
    );
  };
}
