import './PanelList.scss';
import { PanelListModeEnum } from '../shared/model/PanelListModeEnum';
import { useEffect, useRef, useState } from 'react';
import { AddItem } from './add-item/AddItem';
import { SimpleItem } from '../shared/model/SimpleItem';
import { ItemsList } from './items-list/ItemsList';
import SimpleItemEventEmitter from '../shared/service/PanelsContainerService';
import { PanelContainerEventsEnum } from '../shared/model/PanelContainerEventsEnum';

type Props = {
  mode: PanelListModeEnum;
}

export const PanelList: React.FC<Props> = ({ mode }) => {
  const [items, setItems] = useState<ReadonlyArray<SimpleItem>>([]);
  const itemsStateRef = useRef(items);

  const onAddItem = (item: Readonly<SimpleItem>): void => {
    setItems([...items, item]);
  };

  const moveItemFromThisPanel = (item: Readonly<SimpleItem>): void => {
    setItems(items.filter(simpleItem => simpleItem.id !== item.id));
    SimpleItemEventEmitter.emit(mode === PanelListModeEnum.LEFT ? PanelContainerEventsEnum.MOVE_FROM_LEFT : PanelContainerEventsEnum.MOVE_FROM_RIGHT, item);
  };

  useEffect(() => {
    itemsStateRef.current = items;
  }, [items]);

  const onItemMovedToThisPanel = (item: SimpleItem): void => {
    setItems([...itemsStateRef.current, item]);
  };

  useEffect(() => {
    const moveEventName = mode === PanelListModeEnum.LEFT ? PanelContainerEventsEnum.MOVE_FROM_RIGHT : PanelContainerEventsEnum.MOVE_FROM_LEFT;
    SimpleItemEventEmitter.on(moveEventName, onItemMovedToThisPanel);
    return () => {
      SimpleItemEventEmitter.disposeCallback(moveEventName, onItemMovedToThisPanel);
    };
  }, []);

  return (
    <div className={`PanelList ${mode}`}>
      <AddItem onAddItem={onAddItem}></AddItem>
      <ItemsList items={items} mode={mode} onItemMove={moveItemFromThisPanel} />
    </div>
  );
};
