import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BUTTON_LEFT_TEXT, BUTTON_RIGHT_TEXT, ItemsList } from './ItemsList';
import { PanelListModeEnum } from '../../shared/model/PanelListModeEnum';
import { SimpleItem } from '../../shared/model/SimpleItem';

describe('ItemsList', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create ItemsList', async () => {
    render(<ItemsList mode={PanelListModeEnum.LEFT} items={[]} onItemMove={() => {
    }} />);

    const element = await screen.findByTestId('ItemsList');

    expect(element).toBeInTheDocument();
  });

  it('should not display items if no items in props', () => {
    render(<ItemsList mode={PanelListModeEnum.LEFT} items={[]} onItemMove={() => {
    }} />);

    const element = screen.queryByTestId('AppButton');

    expect(element).toBeNull();
  });

  it('should display all items ', async () => {
    const items = [new SimpleItem('id1', 'value1'), new SimpleItem('id2', 'value2')];
    render(<ItemsList mode={PanelListModeEnum.LEFT}
                      items={items} onItemMove={() => {
    }} />);

    const valueElements = await screen.findAllByTestId('ItemsList-value');

    expect(valueElements.length).toBe(2);
    expect(valueElements[0]).toHaveTextContent(items[0].value);
    expect(valueElements[1]).toHaveTextContent(items[1].value);
  });

  it('should display only right buttons for left panel', async () => {
    render(<ItemsList mode={PanelListModeEnum.LEFT} items={[new SimpleItem('id1', 'value1')]} onItemMove={() => {
    }} />);

    const buttonsLeft = screen.queryAllByText(BUTTON_LEFT_TEXT);
    const buttonsRight = screen.queryAllByText(BUTTON_RIGHT_TEXT);

    expect(buttonsLeft.length).toBe(0);
    expect(buttonsRight.length).toBe(1);
  });

  it('should display only left buttons for right panel', () => {
    render(<ItemsList mode={PanelListModeEnum.RIGHT} items={[new SimpleItem('id1', 'value1')]} onItemMove={() => {
    }} />);

    const buttonsLeft = screen.queryAllByText(BUTTON_LEFT_TEXT);
    const buttonsRight = screen.queryAllByText(BUTTON_RIGHT_TEXT);

    expect(buttonsLeft.length).toBe(1);
    expect(buttonsRight.length).toBe(0);
  });

  it('should display only left buttons for right panel', async () => {
    render(<ItemsList mode={PanelListModeEnum.RIGHT} items={[new SimpleItem('id1', 'value1')]} onItemMove={() => {
    }} />);

    const buttonsLeft = screen.queryAllByText(BUTTON_LEFT_TEXT);
    const buttonsRight = screen.queryAllByText(BUTTON_RIGHT_TEXT);

    expect(buttonsLeft.length).toBe(1);
    expect(buttonsRight.length).toBe(0);
  });

  it('should call listener with item on button click ', async () => {
    const items = [new SimpleItem('id1', 'value1'), new SimpleItem('id2', 'value2')];
    const listenerObj = {
      listener: (item: SimpleItem) => {
      }
    };
    const listenerSpy = jest.spyOn(listenerObj, 'listener');
    render(<ItemsList mode={PanelListModeEnum.LEFT}
                      items={items} onItemMove={listenerObj.listener} />);

    const buttons = await screen.findAllByTestId('AppButton');
    fireEvent.click(buttons[1]);

    expect(listenerSpy).toHaveBeenCalledTimes(1);
    expect(listenerSpy).toHaveBeenCalledWith(items[1]);
  });
});
