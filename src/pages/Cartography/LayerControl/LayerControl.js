import { Component } from 'react';
import { Button, Modal } from 'antd';
import st from './LayerControl.less';
import std from '../default.less';

import DataPanel from './DataPanel';
import HeatLayerStyle from './HeatLayerStyle';

class LayerControl extends Component {
  state = { showDataPanel: false };

  showDataPanel() {
    this.setState({ showDataPanel: true });
  }

  hiddenDataPanel() {
    this.setState({ showDataPanel: false });
  }

  render() {
    let { showDataPanel } = this.state;
    return (
      <div className={st.LayerControl}>
        <div className={`${std.h1} iconfont icon-tuceng`}>地图图层设置</div>
        <div className={std.slider} />
        <Button type="dashed" style={{ width: '100%' }} onClick={e => this.showDataPanel()}>
          添加数据
        </Button>
        <div className={st.layers}>layers</div>
        <div className={std.slider} />
        <div className={std.fitem}>
          <div className={std.fitem_t}>
            <div className={std.fitem_mt}>样式编辑</div>
            <div className={std.fitem_st}>编辑数据样式</div>
          </div>
        </div>
        <div className={st.editpanel}>
          <HeatLayerStyle />
        </div>
        <Modal
          title="添加数据"
          visible={showDataPanel}
          width={800}
          destroyOnClose={true}
          onCancel={e => this.hiddenDataPanel()}
          onOk={e => this.hiddenDataPanel()}
          centered={true}
        >
          <DataPanel />
        </Modal>
      </div>
    );
  }
}

export default LayerControl;
