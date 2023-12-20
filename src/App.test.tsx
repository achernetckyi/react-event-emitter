import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

it('should create App', async () => {
  render(<App />);
  const appElement = await screen.findByTestId('App');
  expect(appElement).toBeInTheDocument();
});
