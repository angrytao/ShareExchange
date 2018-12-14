import { Component, Fragment } from 'react';
import { List, Avatar, Icon, Input, Button } from 'antd';
import PrivateDataCatalogInsert from './PrivateDataCatalogInsert';
import axios from 'axios';
import { requestGetShareDataByUser } from '../../../Common/requestUrl';
import store from '../../../store';
import { initPrivateDataList } from "../../../store/actionCreates";
import Selector from '../Selector';
import st from './PrivateDataCatalog.less';
import tag1 from '../../images/tag1.png';
import tag2 from '../../images/tag2.png';
import tag3 from '../../images/tag3.png';
import tag4 from '../../images/tag4.png';
import tag5 from '../../images/tag5.png';
import tag6 from '../../images/tag6.png';
import tag7 from '../../images/tag7.png';
import tag8 from '../../images/tag8.png';
import tag9 from '../../images/tag9.png';


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);

class PrivateDataCatalog extends Component {
  constructor(props){
    super(props);
    this.state = store.getState(); 
    this.handleStoreChange = this.handleStoreChange.bind(this);
    store.subscribe(this.handleStoreChange); 

    this.getPrivateData = this.getPrivateData.bind(this);

  }

  componentDidMount() {
      let params = {'uId':'F1D7F258-5798-4729-A6DC-8656AC406A10'};
      axios.post(requestGetShareDataByUser,params).then((res) => {
          const data = res.data;
          window.privateDataCatalog = data;
          const action = initPrivateDataList(data,'');
          store.dispatch(action);
          console.log(this.state.privateDataCatalog);
      });
  }

  render() {
    //console.log(window.privateDataCatalog);
    return (
      <Fragment>
        <PrivateDataCatalogInsert></PrivateDataCatalogInsert>
        <Selector
            tagSelect={this.handleTagSelect.bind(this)}
            searchName={this.handleSearchOpenCatalog.bind(this)}
            resetData={this.handleResetOpenDataCatalog.bind(this)}
        >
        </Selector>
        {this.getPrivateData()}
      </Fragment>
    )
  }
   
  //获取用户私有目录
  getPrivateData = () => {
    return (
      <List
          itemLayout="vertical"
          style={{marginBottom:'30px'}}
          size="large"
          pagination={{
              onChange: (page) => {
                  console.log(page)
              },
              pageSize: 5
          }}
          dataSource={this.state.privateDataCatalog}
          footer={<div><b>公共开放数据</b></div>}
          renderItem={item => (
              <List.Item
                  key={item.ShareDataId}
                  actions={[
                      <IconText type="clock-circle" text={item.ShareDataPubdate}/>,
                      <IconText type="star-o" text={item.ShareStarNum} />,
                      <IconText type="download" text={item.ShareDownloadNum} />
                  ]}
                  extra={<img width={170} alt="logo" src={this.getTagImage(item.TagName)} />}
              >
                  <List.Item.Meta
                      title={<a>{item.ShareDataTitle}</a>}
                      description={item.ShareDataDesc}
                  />
                  <a href="#">查看</a> | <a href="#">下载</a>
              </List.Item>
          )}
      >
      </List>
    )
  }

  //通过标签筛选
  handleTagSelect = (tagType) => {
    const openDataCatalogData = window.privateDataCatalog.filter(item => item.TagName == tagType);
    const action = initPrivateDataList([...openDataCatalogData],tagType);
    store.dispatch(action);
  }

  //通过目录名筛选
  handleSearchOpenCatalog = () => {
      const searchContent = this.state.searchCatalogValue;
      const DataCatalog = window.privateDataCatalog;
      const openDataCatalogData = typeof (searchContent) != "undefined" ? DataCatalog.filter(item => item.ShareDataTitle.indexOf(searchContent) >= 0) : DataCatalog;
      const action = initPrivateDataList(openDataCatalogData,'');
      store.dispatch(action);
  }

  //重置开放数据目录
  handleResetOpenDataCatalog = (e) => {
      const action = initPrivateDataList(window.privateDataCatalog,'');
      store.dispatch(action);
  }

  //获取标签图片
  getTagImage = (tag) => {
    switch (tag) {
        case '统计':
            return tag1;
        case '交通':
            return tag2;
        case '测绘':
            return tag3;
        case '财政税收':
            return tag4;
        case '教育':
            return tag5;
        case '医疗卫生':
            return tag6;
        case '社区':
            return tag7;
        case '安全':
            return tag8;
        default:
            return tag9;
    }
  }

  handleStoreChange = () => {
    this.setState(store.getState());
  }
}


export default PrivateDataCatalog;