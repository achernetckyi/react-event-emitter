import { fireEvent, render, screen, within } from '@testing-library/react';
import { PanelListModeEnum } from '../shared/model/PanelListModeEnum';
import React from 'react';
import { PanelList } from './PanelList';
import { PanelListTestHarness } from './PanelList.test-harness';

describe('PanelList', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create PanelList', async () => {
    render(<PanelList mode={PanelListModeEnum.LEFT} />);

    const element = await screen.findByTestId('PanelList');

    expect(element).toBeInTheDocument();
  });

  it('should not display any items in the beginning', async () => {
    render(<PanelList mode={PanelListModeEnum.LEFT} />);

    const itemsListElement = await screen.findByTestId('ItemsList');
    const button = within(itemsListElement).queryByTestId('AppButton');

    expect(button).toBeNull();
  });

  it('should display new item in a list after clicking on "+" button', async () => {
    const expectedText = 'AaBbCc';
    render(<PanelList mode={PanelListModeEnum.LEFT} />);

    const container = await screen.findByTestId('PanelList');
    await PanelListTestHarness.addItems(container, [expectedText]);
    const itemsListElement = await screen.findByTestId('ItemsList');
    const moveButtons = await within(itemsListElement).findAllByTestId('AppButton');
    const itemValueElement = await within(itemsListElement).findByText(expectedText);

    expect(moveButtons.length).toBe(1);
    expect(itemValueElement).toBeDefined();
  });

  it('should delete item on move button', async () => {
    const expectedText1 = 'AaBbCc1';
    const expectedText2 = 'AaBbCc2';
    render(<PanelList mode={PanelListModeEnum.LEFT} />);

    const container = await screen.findByTestId('PanelList');
    await PanelListTestHarness.addItems(container, [expectedText1, expectedText2]);
    const itemsListElement = await screen.findByTestId('ItemsList');
    const moveButtons = await within(itemsListElement).findAllByTestId('AppButton');
    fireEvent.click(moveButtons[1]);
    const itemValueElement1 = within(itemsListElement).queryByText(expectedText1);
    const itemValueElement2 = within(itemsListElement).queryByText(expectedText2);

    expect(itemValueElement1).toBeInTheDocument();
    expect(itemValueElement2).not.toBeInTheDocument();
  });

});
