import OriginalIcon from '@/web/components/atoms/icon';
import { classnames, compose } from 'tailwind-compose';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface StyledLinkButtonProps {
  isAlert: boolean;
  isSecondary: boolean;
}

export interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isAlert: boolean;
  isSecondary: boolean;
}

const baseStyles = [
  '!no-underline',
  'block',
  'w-full',
  'min-w-[200px]',
  'text-center',
  'font-mono',
  'border-2',
  'focus:ring-2',
  'text-base',
  'px-5',
  'py-2.5',
  'focus:outline-none',
  'disabled:cursor-not-allowed',
  '[&>*]:flex',
  '[&>*]:justify-center',
  '[&>*]:items-center',
];

const primaryButtonStyles = [
  ...baseStyles,
  'bg-neutral-950',
  'text-gray-50',
  'border-gray-50',
  'hover:bg-gray-50',
  'hover:text-neutral-950',
  'active:bg-gray-50/20',
  'active:text-gray-50',
  'focus:ring-gray-50/40',
  'disabled:text-gray-50/60',
  'disabled:border-gray-50/60',
  'disabled:hover:bg-neutral-950',
];

const secondaryButtonStyles = [
  ...baseStyles,
  'bg-gray-50',
  'text-neutral-950',
  'border-transparent',
  'hover:bg-gray-50/80',
  'active:bg-gray-50/20',
  'active:text-gray-50',
  'active:border-gray-50',
  'focus:ring-gray-50/40',
  'disabled:hover:bg-gray-50',
];

const alertButtonStyles = [
  ...baseStyles,
  'bg-neutral-950',
  'text-red-500',
  'border-red-500',
  'hover:bg-red-500',
  'hover:text-neutral-950',
  'active:bg-red-500/20',
  'active:text-red-500',
  'focus:ring-red-500/40',
  'disabled:text-red-500/60',
  'disabled:border-red-500/60',
  'disabled:hover:bg-neutral-950',
];

export const Button = compose.button<StyledButtonProps>((conditional) => [
  conditional(primaryButtonStyles, ({ isAlert, isSecondary }) => !isAlert && !isSecondary),
  conditional(secondaryButtonStyles, ({ isSecondary }) => isSecondary),
  conditional(alertButtonStyles, ({ isAlert }) => isAlert),
]);

export const Link = classnames<StyledLinkButtonProps>((conditional) => [
  conditional(primaryButtonStyles, ({ isAlert, isSecondary }) => !isAlert && !isSecondary),
  conditional(secondaryButtonStyles, ({ isSecondary }) => isSecondary),
  conditional(alertButtonStyles, ({ isAlert }) => isAlert),
]);

export interface StyledContentProps {
  children: ReactNode;
  isProcessing?: boolean;
}

export const Content = compose.span<StyledContentProps>((conditional) => [
  conditional('sr-only', ({ isProcessing }) => isProcessing === true),
]);

export const Icon = compose(OriginalIcon, () => [
  'w-6',
  'h-6',
  'mr-2',
]);

export const LoadingIcon = compose(OriginalIcon, () => [
  'animate-spin',
  'mx-auto',
  'w-6',
  'h-6',
]);
