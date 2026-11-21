import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CmsProvider } from '../context/CmsContext';
import { useCms } from '../context/useCms';

function TestConsumer() {
  const { cms, updateHero, resetToDefaults } = useCms();
  return (
    <div>
      <span data-testid="headline">{cms.hero.headline}</span>
      <button
        type="button"
        onClick={() =>
          updateHero({
            headline: 'Updated Test Headline',
          })
        }
      >
        Update Hero
      </button>
      <button type="button" onClick={resetToDefaults}>
        Reset Defaults
      </button>
    </div>
  );
}

describe('CmsContext & useCms Hook', () => {
  it('should render default CMS values within CmsProvider', () => {
    render(
      <CmsProvider>
        <TestConsumer />
      </CmsProvider>
    );

    const headline = screen.getByTestId('headline');
    expect(headline.textContent).toBeTruthy();
  });

  it('should update section state dynamically when triggered', async () => {
    const user = userEvent.setup();
    render(
      <CmsProvider>
        <TestConsumer />
      </CmsProvider>
    );

    const updateBtn = screen.getByText('Update Hero');
    await user.click(updateBtn);

    const headline = screen.getByTestId('headline');
    expect(headline.textContent).toBe('Updated Test Headline');
  });

  it('should throw an error when useCms is used outside CmsProvider', () => {
    expect(() => render(<TestConsumer />)).toThrow(
      'useCms must be used within a CmsProvider'
    );
  });
});
