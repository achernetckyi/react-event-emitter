import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AppButton } from './AppButton';
import clearAllMocks = jest.clearAllMocks;

describe('AppButton', () => {

  afterEach(() => {
    clearAllMocks();
  })

  it('should create AppButton', async () => {
    render(<AppButton text="aa" onClick={() => {
    }} />);

    const appButton = await screen.findByTestId('AppButton');

    expect(appButton).toBeInTheDocument();
  });

  it('should show text', async () => {
    const buttonText = 'AaBbCc';
    render(<AppButton text={buttonText} onClick={() => {
    }} />);

    const appButton = await screen.findByTestId('AppButton');

    expect(appButton).toHaveTextContent(buttonText);
  });

  it('should call listener on click', async () => {
    const listenerObj = {listener: () => {}};
    const listenerMock = jest.spyOn(listenerObj, 'listener');
    render(<AppButton text='aa' onClick={listenerObj.listener} />);

    const appButton = await screen.findByTestId('AppButton');
    fireEvent.click(appButton);

    expect(listenerMock).toHaveBeenCalledTimes(1);
  });
});
