import { Component, Fragment } from 'react';
import { List, Avatar, Icon, Input, Button } from 'antd';
import PrivateDataCatalogInsert from './PrivateDataCatalogInsert';
import axios from 'axios';
import { requestGetShareDataByUser } from '../../../Common/requestUrl';
import store from '../../../store';
import { initPrivateDataList } from "../../../store/actionCreates";
import Selector from '../Selector';
import st from './PrivateDataCatalog.less';


class PrivateDataCatalog extends Component {
  componentDidMount() {
    let params = {'uId':'F1D7F258-5798-4729-A6DC-8656AC406A10'};
    axios.post(requestGetShareDataByUser,params).then((res) => {
        const data = res.data;
        window.privateDataCatalog = data;
        const action = initPrivateDataList(data);
        store.dispatch(action);
      
    });
}

  render() {
    console.log(window.privateDataCatalog);
    return (
      <Fragment>
        <PrivateDataCatalogInsert></PrivateDataCatalogInsert>
        <Selector
        
        >
        </Selector>
        {this.getPrivateData}
      </Fragment>
    )
  }

  getPrivateData = () => {
    return (
      <List
        itemLayout="horizontal"
        dataSource={this.state.privateDataCatalog}
      >
        
      </List>
    )
  }
}


export default PrivateDataCatalog;