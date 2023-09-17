import Input from '@/ui/components/atoms/input';
import { render, screen } from '@testing-library/react';

describe('atoms/input', () => {
  it('renders the label and input', () => {
    render(<Input label='Test Label' />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays an error message when passed an error prop', () => {
    render(<Input errorMessage='Test Error' label='Test Label' error />);
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });
});
