import Link from '@/web/components/atoms/link';
import { render, screen } from '@testing-library/react';

describe('atoms/link', () => {
  it('renders a link with the correct href', () => {
    const href = '/about';

    render(<Link href={href}>About</Link>);
    expect(screen.getByRole('link')).toHaveAttribute('href', href);
  });
});
