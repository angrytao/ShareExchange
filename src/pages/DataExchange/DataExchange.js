import { Component, Fragment } from 'react';
import Header from '../Common/Header/Header';
import Banner from './Banner';
import OpenDataCatalog from './OpenDataCatalog';
import { Tabs, Icon  } from 'antd';
import st from './DataExchange.less';

class DataExchange extends Component {

  render() {
    const TabPane = Tabs.TabPane;

    return (
      <Fragment>
        <Header></Header>
        <Banner></Banner>
        <div className={st.content}>
          <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="database"></Icon>开放数据目录</span>} key="1">
              <OpenDataCatalog></OpenDataCatalog>
            </TabPane>
            <TabPane tab={<span><Icon type="copy"></Icon>我的数据</span>} key="2">Content of Tab Pane 2</TabPane>
            <TabPane tab={<span><Icon type="pie-chart"></Icon>用量统计</span>} key="3">Content of Tab Pane 2</TabPane>
          </Tabs>
        </div>
      </Fragment>
    )
  }
}

export default DataExchange;
