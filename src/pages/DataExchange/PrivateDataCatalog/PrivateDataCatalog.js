import { Component, Fragment } from 'react';
import { List, Form, Icon, Input, Button } from 'antd';
import PrivateDataCatalogInsert from './PrivateDataCatalogInsert';
import DataFilter from '../DataFilter';
import st from './PrivateDataCatalog.less';


class PrivateDataCatalog extends Component {
 

  render() {
   
    return (
      <Fragment>
        <PrivateDataCatalogInsert></PrivateDataCatalogInsert>
        <DataFilter></DataFilter>
      </Fragment>
    )
  }
}


export default PrivateDataCatalog;