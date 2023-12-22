import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { AddItem } from './AddItem';
import { SimpleItem } from '../../shared/model/SimpleItem';
import clearAllMocks = jest.clearAllMocks;
import { AddItemTestHarness } from './AddItem.test-harness';

describe('AddItem', () => {

  afterEach(() => {
    clearAllMocks();
  });

  it('should create AddItem', async () => {
    render(<AddItem onAddItem={() => {
    }} />);

    const element = await screen.findByTestId('AddItem');

    expect(element).toBeInTheDocument();
  });

  it('should keep entered text in input', async () => {
    const expectedText = 'AaBbCc';

    render(<AddItem onAddItem={() => {
    }} />);
    const input = await screen.findByTestId('AddItem-Input');
    fireEvent.change(input, {
      target: {
        value: expectedText
      }
    });

    expect(input).toHaveValue(expectedText);
  });

  it('should call the listener with text from input on clicking "+" button', async () => {
    const expectedText = 'AaBbCc';
    const expectedId = 'fde2b853-4cf7-4b78-b240-59c229cdab45';
    const listenerObj = {
      listener: (item: Readonly<SimpleItem>) => {
      }
    };
    const listenerMock = jest.spyOn(listenerObj, 'listener');
    jest.spyOn(crypto, 'randomUUID').mockReturnValue(expectedId);
    render(<AddItem onAddItem={listenerObj.listener} />);

    await AddItemTestHarness.addItem(await screen.findByTestId('AddItem'), expectedText);

    expect(listenerMock).toHaveBeenCalledTimes(1);
    expect(listenerMock).toHaveBeenCalledWith(expect.objectContaining({
      value: expectedText,
      id: expectedId
    }));
  });

  it('should not call the listener without text', async () => {
    const expectedText = '';
    const listenerObj = {
      listener: (item: Readonly<SimpleItem>) => {
      }
    };
    const listenerMock = jest.spyOn(listenerObj, 'listener');

    render(<AddItem onAddItem={listenerObj.listener} />);
    await AddItemTestHarness.addItem(await screen.findByTestId('AddItem'), expectedText);

    expect(listenerMock).toHaveBeenCalledTimes(0);
  });


});
