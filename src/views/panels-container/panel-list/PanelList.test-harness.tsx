import { AddItemTestHarness } from './add-item/AddItem.test-harness';

export class PanelListTestHarness {

  public static readonly addItems = async (panelListContainer: HTMLElement, itemNames: string[]): Promise<void> => {
    for (const itemName of itemNames) {
      await AddItemTestHarness.addItem(panelListContainer, itemName);
    }
  };
}
