import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the notes interface', async () => {
  global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));

  render(<App />);

  expect(screen.getByRole('heading', { name: /suas notas/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /adicionar nota/i })).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText(/você ainda não tem notas/i)).toBeInTheDocument());
});
