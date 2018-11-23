import { Component } from 'react';
import st from './Cartography.less';

import DrawTool from './DrawTool/DrawTool';
import LayerControl from './LayerControl/LayerControl';
import MapSetting from './MapSetting/MapSetting';
import Map from './Map/Map';

let enums = {
  LayerControl: 'LayerControl',
  MapSetting: 'MapSetting',
  DrawTool: 'DrawTool',
};

class Cartography extends Component {
  state = {
    activePanel: enums.MapSetting,
  };

  getActiveCls(panelType) {
    let { activePanel } = this.state;
    return activePanel === panelType ? 'active ' : '';
  }

  changePanel(panelType) {
    this.setState({ activePanel: panelType });
  }

  render() {
    let { activePanel } = this.state;
    return (
      <div className={st.Cartography}>
        <div className={st.siderbar}>
          <div className={st.logo + ' iconfont icon-wangzhuangdiqiu'} />
          <div className={st.mappingbar}>
            <div
              onClick={e => this.changePanel(enums.LayerControl)}
              className={this.getActiveCls(enums.LayerControl)}
            >
              <div className={'iconfont icon-tuceng'}>图层</div>
            </div>
            <div
              onClick={e => this.changePanel(enums.MapSetting)}
              className={this.getActiveCls(enums.MapSetting)}
            >
              <div className={'iconfont icon-shezhi'}>设置</div>
            </div>
            <div
              onClick={e => this.changePanel(enums.DrawTool)}
              className={this.getActiveCls(enums.DrawTool)}
            >
              <div className={'iconfont icon-shouhuixian'}>绘制</div>
            </div>
          </div>
          <div className={st.actionbar}>
            <div>
              <div className="iconfont icon-shouce-">指南</div>
            </div>
            <div>
              <div className="iconfont icon-fenxiang">分享</div>
            </div>
            <div>
              <div className="iconfont icon-save">保存</div>
            </div>
            <div>
              <div className="iconfont icon-lingcunwei">另存</div>
            </div>
          </div>
        </div>
        <div className={st.toolpanel}>
          <div className={this.getActiveCls(enums.DrawTool)}>
            <DrawTool />
          </div>
          <div className={this.getActiveCls(enums.LayerControl)}>
            <LayerControl />
          </div>
          <div className={this.getActiveCls(enums.MapSetting)}>
            <MapSetting />
          </div>
        </div>
        <div className={st.map}>
          <Map />
        </div>
      </div>
    );
  }
}

export default Cartography;
