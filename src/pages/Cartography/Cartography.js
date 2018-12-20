import { Component } from 'react';
import st from './Cartography.less';
import '../../refs/__Extends__';

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
    activePanel: enums.LayerControl,
  };

  getActiveCls(panelType) {
    let { activePanel } = this.state;
    return activePanel === panelType ? 'active ' : '';
  }

  changePanel(panelType) {
    this.setState({ activePanel: panelType });
  }

  componentDidMount() {
    this.mapSetting.on('baseMapChange', e => {
      this.map.changeBaseMap(e.data.types);
    });
    this.mapSetting.on('mapTitleChange', e => {
      this.map.setTitle(e.data);
    });
    this.mapSetting.on('mapContentChange', e => {
      this.map.toggleMapContent(e.data.showContent, e.data.content);
    });
    this.mapSetting.on('mapScaleChange', e => {
      this.map.setScale(e.data);
    });
    this.mapSetting.on('mapZoomChange', e => {
      this.map.setZoom(e.data);
    });
    this.mapSetting.on('showLevelChange', e => {
      this.map.toggleLevel(e.data);
    });
    this.mapSetting.on('showMeasureChange', e => {
      this.map.toggleMeasure(e.data);
    });
    this.mapSetting.on('showBaseMapChange', e => {
      this.map.toggleBaseMapToggle(e.data);
    });
    this.mapSetting.on('showMousePosition', e => {
      this.map.toggleMousePosition(e.data);
    });
    this.map.on('baseMapChange', e => {
      this.mapSetting.setState({ baseMap: e.data[0], showAnno: true });
    });

    this.drawTool.initDrawTools(this.map.map);

    this.layerControl.map = this.map.map;
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
            <DrawTool ref={e => (this.drawTool = e)} />
          </div>
          <div className={this.getActiveCls(enums.LayerControl)}>
            <LayerControl ref={e => (this.layerControl = e)} />
          </div>
          <div className={this.getActiveCls(enums.MapSetting)}>
            <MapSetting ref={e => (this.mapSetting = e)} />
          </div>
        </div>
        <div className={st.map}>
          <Map ref={e => (this.map = e)} />
        </div>
      </div>
    );
  }
}

export default Cartography;
