import './AddItem.scss';
import { AppButton } from '../../../shared/app-button/AppButton';
import { SimpleItem } from '../../shared/model/SimpleItem';
import { useState } from 'react';

type Props = {
  onAddItem: (item: Readonly<SimpleItem>) => void;
}

export const AddItem: React.FC<Props> = ({ onAddItem }) => {

  const [value, setValue] = useState<string>('');

  const onAddItemClick = (): void => {
    if (value) {
      onAddItem(new SimpleItem(crypto.randomUUID(), value));
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setValue(event.target.value);
  };

  return (
    <div className="AddItem" data-testid="AddItem">
      <input data-testid="AddItem-Input" type="text" className="AddItem__input" value={value} onChange={onInputChange} />
      <AppButton text="+" onClick={onAddItemClick} />
    </div>
  );
};
