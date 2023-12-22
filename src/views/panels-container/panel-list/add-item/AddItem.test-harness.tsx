import { fireEvent, within } from '@testing-library/react';

export class AddItemTestHarness {

  public static readonly addItem = async (container: HTMLElement, itemName: string): Promise<void> => {
    const addItemElement = container.classList.contains('AddItem') ? container : await within(container).findByTestId('AddItem');
    const addItemInput = await within(addItemElement).findByTestId('AddItem-Input');
    const addItemButton = await within(addItemElement).findByTestId('AppButton');
    fireEvent.change(addItemInput, {
      target: {
        value: itemName
      }
    });
    fireEvent.click(addItemButton);
  };
}
