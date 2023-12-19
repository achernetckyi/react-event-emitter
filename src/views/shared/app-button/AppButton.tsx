import './AppButton.scss';

type Props = {
  text: string;
  onClick: () => void;
}

export const AppButton: React.FC<Props> = ({ text, onClick }) => {
  return (
    <div className="AppButton" onClick={onClick}> {text} </div>
  );
};
