import './ItemsList.scss';
import { PanelListModeEnum } from '../../shared/model/PanelListModeEnum';
import { SimpleItem } from '../../shared/model/SimpleItem';
import { AppButton } from '../../../shared/app-button/AppButton';

type Props = {
  items: ReadonlyArray<SimpleItem>;
  mode: PanelListModeEnum;
  onItemMove: (item: SimpleItem) => void;
}

export const ItemsList: React.FC<Props> = ({ items, mode, onItemMove }) => {

  const itemsList = items.map(item =>
    <div className="ItemsList__item" key={item.id}>
      {mode === PanelListModeEnum.RIGHT && (<AppButton text="<<" onClick={() => {
        onItemMove(item);
      }} />)}
      <span> {item.value} </span>
      {mode === PanelListModeEnum.LEFT && (<AppButton text=">>" onClick={() => {
        onItemMove(item);
      }} />)}
    </div>
  );
  return (
    <div className="ItemsList"> {itemsList} </div>
  );
};
