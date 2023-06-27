import type { ImageLoaderProps } from 'next/image';

export function fallback({ src }: ImageLoaderProps) {
  return src;
}

export function optimised({ src, width }: ImageLoaderProps) {
  if (typeof src !== 'string') {
    return src;
  }

  const extensions = ['jpeg', 'jpg', 'png'];
  const extension = src.split('.').pop() as string;

  if (!extensions.includes(extension)) {
    return src;
  }

  const filename = src.split('/').pop()?.split('.').shift();
  const path = src.split('/').slice(0, -1).join('/');

  return `${path}/${filename}-${width}.webp`;
}
