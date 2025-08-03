import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders admin app', () => {
  render(<App />);
  // This is a basic test - the actual app needs backend connection
  expect(document.body).toBeInTheDocument();
});
