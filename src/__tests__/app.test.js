import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import App from '../app.js';

const server = setupServer(
  rest.get('*', (req, res, ctx) => {
    return res(ctx.json({ data: [{ name: 'testington' }] }));
  }),
  rest.post('*', (req, res, ctx) => {
    return res(ctx.json({ data: [{ name: 'testington' }] }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Form submission tests', () => {
  render(<App />);

  let form = screen.getByTestId('form');
  let selectMethod = screen.getByTestId('selectMethod');
  let resultArea = screen.getByTestId('result-area');

  it('should update the response area and current request on submit', async () => {
    fireEvent.click(selectMethod, { target: { id: 'post' } });
    fireEvent.submit(form, { target: { url: { value: 'test url' } } });

    await screen.findByText(/post : test url/i).then((result) => expect(result).toBeTruthy());
    expect(resultArea).not.toBeNull();
  });

  it('should get results from a mock API', async () => {
    setInterval(() => expect(resultArea).toContainHTML('testington'), 2000);
  })
});


