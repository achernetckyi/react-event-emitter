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
    <li key={item.id}>
      {mode === PanelListModeEnum.RIGHT && (<AppButton text="<<" onClick={() => {
        onItemMove(item);
      }} />)}
      {item.value}
      {mode === PanelListModeEnum.LEFT && (<AppButton text=">>" onClick={() => {
        onItemMove(item);
      }} />)}
    </li>
  );
  return (
    <ul className="ItemsList"> {itemsList} </ul>
  );
};
