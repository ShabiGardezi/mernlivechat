<<<<<<< HEAD
 import { render, screen } from '@testing-library/react';
=======
import { render, screen } from '@testing-library/react';
>>>>>>> 7b41ae252efcd20fe6bf32f350a36250aec2a145
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
