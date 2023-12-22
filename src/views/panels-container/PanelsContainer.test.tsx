import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import { PanelsContainer } from './PanelsContainer';
import { PanelListTestHarness } from './panel-list/PanelList.test-harness';
import { BUTTON_LEFT_TEXT, BUTTON_RIGHT_TEXT } from './panel-list/items-list/ItemsList';

describe('PanelsContainer', () => {

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should create PanelsContainer', async () => {
    render(<PanelsContainer />);

    const element = await screen.findByTestId('PanelsContainer');

    expect(element).toBeInTheDocument();
  });

  it('should have left and right panels', async () => {
    render(<PanelsContainer />);

    const panelElements = await screen.findAllByTestId('PanelList');

    expect(panelElements.length).toBe(2);
    expect(panelElements[0].classList.contains('panel-left')).toBe(true);
    expect(panelElements[1].classList.contains('panel-right')).toBe(true);
  });

  it('should move item from left panel to right', async () => {
    const expectedText1 = 'AaBbCc1';
    const expectedText2 = 'AaBbCc2';
    const expectedText3 = 'AaBbCc3';
    render(<PanelsContainer />);

    const [panelLeft, panelRight] = await screen.findAllByTestId('PanelList');
    await PanelListTestHarness.addItems(panelLeft, [expectedText1, expectedText2]);
    await PanelListTestHarness.addItems(panelRight, [expectedText3]);
    let leftPanelButtons = await within(panelLeft).findAllByText(BUTTON_RIGHT_TEXT);
    fireEvent.click(leftPanelButtons[1]);
    leftPanelButtons = await within(panelLeft).findAllByText(BUTTON_RIGHT_TEXT);
    let rightPanelButtons = await within(panelRight).findAllByText(BUTTON_LEFT_TEXT);
    const text2Element = screen.queryByText(expectedText2);

    expect(leftPanelButtons.length).toBe(1);
    expect(rightPanelButtons.length).toBe(2);
    expect(text2Element).toBeInTheDocument();
  });

})
