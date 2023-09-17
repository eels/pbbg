import Button from '@/ui/components/atoms/button';
import { fireEvent, render, screen } from '@testing-library/react';

describe('atoms/button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disables the button when processing is true', () => {
    render(<Button processing>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
