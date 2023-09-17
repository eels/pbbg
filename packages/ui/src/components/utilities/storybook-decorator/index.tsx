import * as Styled from '@/ui/components/utilities/storybook-decorator/styled';
import StringsProvider from '@/ui/components/utilities/strings-provider';
import cc from 'classcat';
import { excelsior, roboto } from '@/ui/config/fonts';
import type { PartialStoryFn } from '@storybook/types';
import type { ReactRenderer } from '@storybook/react';

export function withStorybookDecorator() {
  const icons = process.env.STATIC_ICONS;

  return function StoryblokDecorator(Story: PartialStoryFn<ReactRenderer>) {
    return (
      <Styled.Wrapper className={cc([excelsior.variable, roboto.variable])}>
        <StringsProvider>
          <div dangerouslySetInnerHTML={{ __html: icons ?? '' }} id='__icons' />
          <Story />
        </StringsProvider>
      </Styled.Wrapper>
    );
  };
}
