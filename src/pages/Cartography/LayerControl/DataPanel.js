import { Component } from 'react';
import { Tabs, Button, Input, Icon, Tooltip } from 'antd';
import st from './DataPanel.less';

import { layers, layers0 } from './tmpData';

class DataPanel extends Component {
  addLayer(layer) {
    let { layerAdded } = this.props;
    layerAdded && layerAdded(layer);
  }

  getLayers(layers) {
    let cmps = [];
    for (let i = 0; i < layers.length; i++) {
      let layer = layers[i];
      cmps.push(
        <div className={st.layeritem}>
          <div>{i + 1}</div>
          <div className={st.title}>{layer.name}</div>
          <span>{layer.typeAlias}</span>
          <div>
            <Tooltip title="添加">
              <Icon type="plus-circle" onClick={e => this.addLayer(layer)} />
            </Tooltip>
          </div>
        </div>
      );
    }
    return cmps;
  }

  render() {
    return (
      <div className={st.DataPanel}>
        <div className={st.btns}>
          <Input.Search placeholder="请输入关键字..." />
          &emsp;
          <Button icon="upload">上传数据</Button>
        </div>
        <Tabs>
          <Tabs.TabPane tab="我的数据" key="1">
            <div className={st.panel}>{this.getLayers(layers)}</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="共享数据" key="2">
            <div className={st.panel}>{this.getLayers(layers0)}</div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default DataPanel;
