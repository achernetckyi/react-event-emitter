import './PanelsContainer.scss';
import { PanelList } from './panel-list/PanelList';
import { PanelListModeEnum } from './shared/model/PanelListModeEnum';

export const PanelsContainer = () => {
  return (
    <div className="PanelsContainer" data-testid="PanelsContainer">
      <PanelList mode={PanelListModeEnum.LEFT}></PanelList>
      <PanelList mode={PanelListModeEnum.RIGHT}></PanelList>
    </div>
  );
};
