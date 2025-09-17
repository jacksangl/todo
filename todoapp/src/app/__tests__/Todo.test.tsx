import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '../page';

// Mock fetch
global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockClear();
});

test('adds task and it appears', async () => {
  fetch.mockResolvedValueOnce({ ok: true, json: async () => [] })
       .mockResolvedValueOnce({ 
         ok: true, 
         json: async () => ({ _id: '1', text: 'New Task', done: false }) 
       });

  render(<Home />);
  
  const input = screen.getByPlaceholderText('Add a todo');
  const button = screen.getByText('Add');
  
  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(button);
  
  await waitFor(() => {
    expect(screen.getByText('New Task')).toBeInTheDocument();
  });
});

test('marks task as complete and updates status', async () => {
  const mockTodos = [{ _id: '1', text: 'Test Task', done: false }];
  fetch.mockResolvedValueOnce({ ok: true, json: async () => mockTodos });

  render(<Home />);
  
  await waitFor(() => {
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
  
  // Note: Add toggle functionality to your app, then test:
  // fireEvent.click(screen.getByRole('checkbox'));
  // await waitFor(() => expect(screen.getByText('Done')).toBeInTheDocument());
});
