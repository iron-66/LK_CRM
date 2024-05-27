import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => { //метод для тестирования, хрен знает зачем
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
