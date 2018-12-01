import { Component, Fragment } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import PrivateDataCatalogInsert from './PrivateDataCatalogInsert';
import st from './PrivateDataCatalog.less';


class PrivateDataCatalog extends Component {
 

  render() {
   
    return (
      <Fragment>
        <PrivateDataCatalogInsert></PrivateDataCatalogInsert>
      </Fragment>
    )
  }
}


export default PrivateDataCatalog;