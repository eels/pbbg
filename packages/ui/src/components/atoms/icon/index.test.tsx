import Icon from '@/ui/components/atoms/icon';
import { render, screen } from '@testing-library/react';

describe('atoms/icon', () => {
  it('renders the correct icon', () => {
    render(<Icon icon='swords-emblem' />);

    const element = screen.getByRole('presentation');

    expect(element).toContainHTML('<use xlink:href="#swords-emblem"></use>');
  });

  it('applies the className prop', () => {
    render(<Icon className='my-class' icon='swords-emblem' />);

    const element = screen.getByRole('presentation');

    expect(element).toHaveClass('my-class');
  });
});
