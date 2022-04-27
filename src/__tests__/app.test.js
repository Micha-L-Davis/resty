import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../app.js'

describe('Form submission tests', () => {
  render(<App />);

  let form = screen.getByTestId('form');
  let selectMethod = screen.getByTestId('selectMethod');

  it('should update the rest method, request url, and response area on submit', () => {
    let restMethod = screen.getByTestId('rest-method');
    let requestUrl = screen.getByTestId('request-url');
    let resultArea = screen.getByTestId('result-area')

    fireEvent.click(selectMethod, { target: { id: 'post' } });
    fireEvent.submit(form, { target: { url: { value: 'test url' } } });

    expect(requestUrl).toContainHTML('test url');
    expect(restMethod).toContainHTML('post');
    expect(resultArea).not.toBeNull();
  });
});


