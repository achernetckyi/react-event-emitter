import './PanelList.scss';
import { PanelListModeEnum } from '../shared/model/PanelListModeEnum';
import { useState } from 'react';
import { AddItem } from './add-item/AddItem';
import { SimpleItem } from '../shared/model/SimpleItem';
import { ItemsList } from './items-list/ItemsList';

type Props = {
  mode: PanelListModeEnum;
}

export const PanelList: React.FC<Props> = ({ mode }) => {
  const [items, setItems] = useState<ReadonlyArray<SimpleItem>>([]);

  const onAddItem = (item: SimpleItem): void => {
    setItems([...items, item]);
  };

  const moveItem = (item: SimpleItem): void => {
    console.log('Move ' + JSON.stringify(item));
  };

  return (
    <div className={`PanelList ${mode}`}>
      <AddItem onAddItem={onAddItem}></AddItem>
      <ItemsList items={items} mode={mode} onItemMove={moveItem}/>
    </div>
  );
};
