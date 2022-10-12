import OriginalIcon from 'components/atoms/Icon';
import { compose } from 'tailwind-compose';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isProcessing?: boolean;
}

export const Button = compose.button<StyledButtonProps>((conditional) => [
  'text-white', //
  'text-center',
  'bg-green-700',
  'hover:bg-green-800',
  'w-full',
  'py-2',
  'px-6',
  'focus:outline-none',
  conditional('pointer-events-none', ({ isProcessing }) => isProcessing === true),
]);

export interface StyledContentProps {
  children: ReactNode;
  isProcessing?: boolean;
}

export const Content = compose.span<StyledContentProps>((conditional) => [
  conditional('sr-only', ({ isProcessing }) => isProcessing === true), //
]);

export const Icon = compose(OriginalIcon, () => [
  'animate-spin', //
  'mx-auto',
  'w-6',
  'h-6',
]);
