import { render } from '@testing-library/react';

import App from '../App';

test('Renders main page correctly', () => {
  expect(() => {
    render(<App />);
  }).not.toThrow();
});
