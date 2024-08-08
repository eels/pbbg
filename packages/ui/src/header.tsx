import { component$ } from '@builder.io/qwik';
import { hydrate } from '@pbbg/utilities/hydrate-string';

export const Header = component$(() => {
  return (
    <button onClick$={() => console.log('shiiiiit')}>
      {hydrate('Hello %1', ['boyssss'])}
    </button>
  );
});
