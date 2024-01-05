import OriginalIcon from '@/ui/components/atoms/icon';
import { compose } from 'tailwind-compose';

export const Wrapper = compose.div(() => [
  'flex',
  'text-white',
  'justify-center',
  'items-center',
]);

export const Rule = compose.div(() => [
  'bg-white',
  'h-0.5',
  'w-full',
]);

export const Icon = compose(OriginalIcon, () => [
  'w-full',
  'max-w-[50px]',
  'aspect-video',
  'mx-3',
]);
