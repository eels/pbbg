import OriginalIcon from '@/web/components/atoms/icon';
import { compose } from 'tailwind-compose';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface StyledWrapper {
  children: ReactNode;
  className?: string;
  isHidden: boolean;
}

export const Wrapper = compose.div<StyledWrapper>((conditional) => [
  'flex',
  'flex-col',
  'gap-1',
  'w-full',
  conditional('hidden', ({ isHidden }) => isHidden),
]);

export const Label = compose.label(() => [
  'block',
  'font-medium',
  'text-gray-50',
  'font-mono',
]);

export const Container = compose.div(() => [
  'flex',
  'w-full',
]);

export const InputContainer = compose.div(() => [
  'relative',
  'grow',
]);

export const Icon = compose(OriginalIcon, () => [
  'w-5',
  'h-5',
  'absolute',
  'text-gray-50',
  'top-0',
  'bottom-0',
  'left-2.5',
  'my-auto',
]);

export interface StyledInput extends InputHTMLAttributes<HTMLInputElement> {
  hasError: boolean;
  hasIcon: boolean;
}

export const Input = compose.input<StyledInput, HTMLInputElement>((conditional) => [
  'block',
  'w-full',
  'border-2',
  'bg-neutral-950',
  'text-gray-50',
  'text-sm',
  'focus:ring-2',
  'focus:outline-none',
  'placeholder-gray-50/40',
  'p-2.5',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  'read-only:cursor-not-allowed',
  conditional('border-gray-50', ({ hasError }) => !hasError),
  conditional('border-red-500', ({ hasError }) => hasError),
  conditional('focus:border-gray-50', ({ hasError }) => !hasError),
  conditional('focus:border-red-500', ({ hasError }) => hasError),
  conditional('focus:ring-gray-50/40', ({ hasError }) => !hasError),
  conditional('focus:ring-red-500/40', ({ hasError }) => hasError),
  conditional('pl-10', ({ hasIcon }) => hasIcon),
]);
