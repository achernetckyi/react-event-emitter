import './AppButton.scss';

type Props = {
  text: string;
  onClick: (event?: any) => void;
}

export const AppButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <button data-testid="AppButton" className="AppButton" onClick={onClick}> {text} </button>
  );
};
