import Icon from '@/web/components/atoms/icon';
import type { Meta, ReactRenderer, StoryObj } from '@storybook/react';
import type { PartialStoryFn } from '@storybook/types';

export type Story = StoryObj<typeof Icon>;

function IconDecorator(Story: PartialStoryFn<ReactRenderer>) {
  return (
    <div className='text-white [&>*]:w-12 [&>*]:h-12'>
      <Story />
    </div>
  );
}

export default {
  component: Icon,
  decorators: [IconDecorator],
  tags: ['autodocs'],
  title: 'Components/Atoms/Icon',
} satisfies Meta<typeof Icon>;

export const Primary: Story = {
  args: {
    icon: 'swords-emblem',
  },
};
