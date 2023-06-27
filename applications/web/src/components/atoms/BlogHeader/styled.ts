import { compose } from 'tailwind-compose';

export const Wrapper = compose.div(() => [
  'pb-3',
  'mb-3',
  'border-b',
  'border-black',
]);

export const Headline = compose.h2(() => [
  'relative',
]);

export const MetaInformation = compose.div(() => [
  'flex',
  'flex-row',
  'gap-3',
]);

export const MetaInformationItem = compose.div(() => [
  'flex',
  'flex-row',
  'gap-1',
]);
