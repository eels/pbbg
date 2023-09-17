import ConditionalRender from '@/ui/components/utilities/conditional-render';
import { render, screen } from '@testing-library/react';

describe('utilities/conditional-render', () => {
  it('renders children when condition is true', () => {
    render(<ConditionalRender condition={true}>{() => <div>Content</div>}</ConditionalRender>);

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render children when condition is false', () => {
    render(<ConditionalRender condition={false}>{() => <div>Content</div>}</ConditionalRender>);

    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });
});
