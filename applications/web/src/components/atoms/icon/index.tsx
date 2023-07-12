import type { AvailableIcon } from '@/web/types/icon';

export interface IconProps {
  className?: string;
  icon: AvailableIcon;
}

export default function Icon({ className, icon }: IconProps) {
  return (
    <svg className={className} role='presentation'>
      <use xlinkHref={`#${icon}`} />
    </svg>
  );
}
