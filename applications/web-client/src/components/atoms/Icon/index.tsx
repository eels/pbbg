import type { Icon as AvailableIcon } from 'types/icon';

export interface IconProps {
  className?: string;
  icon: typeof AvailableIcon[number];
}

export default function Icon({ className, icon }: IconProps) {
  return (
    <svg className={className}>
      <use xlinkHref={`#${icon}`} />
    </svg>
  );
}
