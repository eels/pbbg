import NextImage from 'next/image';
import { fallback, optimised } from 'components/atoms/Image/image.loaders';
import { useCallback, useState } from 'react';
import type { ImageProps } from 'next/image';

export default function Image({ src, ...rest }: ImageProps) {
  const [hasImageError, setHasImageError] = useState(false);
  const loader = hasImageError ? fallback : optimised;

  const handleOnError = useCallback(() => {
    setHasImageError(true);
  }, [setHasImageError]);

  return <NextImage {...rest} loader={loader} src={src} onError={handleOnError} />;
}
