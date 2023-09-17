import OriginalIcon from '@/ui/components/atoms/icon';
import { compose } from 'tailwind-compose';

export const Wrapper = compose.div(() => [
  'text-gray-50',
  'flex',
  'flex-col',
  'gap-2',
  'font-mono',
  'items-center',
  'justify-center',
]);

export const Icon = compose(OriginalIcon, () => [
  'animate-spin',
  'w-7',
  'h-7',
]);

export const Label = compose.div(() => [
  'uppercase',
]);
