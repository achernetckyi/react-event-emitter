import './PanelList.scss';
import { PanelListModeEnum } from './PanelListModeEnum';
import { useState } from 'react';
import { AddItem } from './add-item/AddItem';
import { SimpleItem } from '../shared/model/SimpleItem';

type Props = {
  mode: PanelListModeEnum;
}

export const PanelList: React.FC<Props> = ({ mode }) => {
  const [items, setItems] = useState<ReadonlyArray<SimpleItem>>([]);

  const onAddItem = (item: SimpleItem): void => {
    setItems([...items, item]);
  };

  return (
    <div className={`PanelList ${mode}`}>
      <AddItem onAddItem={onAddItem}></AddItem>
      <div> {JSON.stringify(items)} </div>
    </div>
  );
};
