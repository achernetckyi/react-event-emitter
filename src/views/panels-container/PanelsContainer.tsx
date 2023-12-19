import './PanelsContainer.scss';
import { PanelList } from './panel-list/PanelList';
import { PanelListModeEnum } from './panel-list/PanelListModeEnum';

export const PanelsContainer = () => {
  return (
    <div className="PanelsContainer">
      <PanelList mode={PanelListModeEnum.LEFT}></PanelList>
      <PanelList mode={PanelListModeEnum.RIGHT}></PanelList>
    </div>
  );
};
