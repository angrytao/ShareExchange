import { Component } from 'react';
import { Tabs, Button, Input } from 'antd';
import st from './DataPanel.less';

class DataPanel extends Component {
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
            <div className={st.panel}>我的数据</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="共享数据" key="2">
            <div className={st.panel}>共享数据</div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default DataPanel;
