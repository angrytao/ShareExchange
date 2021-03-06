import { Component, Fragment } from 'react';
import Header from '../Common/Header/Header';
import Banner from './Banner';
//import OpenDataCatalog from './OpenDataCatalog';
import PublicDataCatalog from './PublicDataCatalog/PublicDataCatalog';
import PrivateDataCatalog from './PrivateDataCatalog/PrivateDataCatalog';
import Statistics from './Statistics/Statistics';
import TableTest from './TableTest';
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
              <PublicDataCatalog></PublicDataCatalog>
            </TabPane>
            <TabPane tab={<span><Icon type="copy"></Icon>我的数据</span>} key="2">
            <PrivateDataCatalog></PrivateDataCatalog>
            </TabPane>
            <TabPane tab={<span><Icon type="pie-chart"></Icon>用量统计</span>} key="3">
              <Statistics></Statistics>
            </TabPane>
            <TabPane tab={<span><Icon type="pie-chart"></Icon>测试</span>} key="4">
              <TableTest></TableTest>
            </TabPane>
          </Tabs>
        </div>
      </Fragment>
    )
  }
}

export default DataExchange;
