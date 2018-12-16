import { Component, Fragment } from 'react';
import { Steps, Icon, Button, Modal, message } from 'antd';
import PrivateDataCatalogInsertDataView from './PrivateDataCatalogInsertDataView';
import PrivateDataCatalogInsertDragger from './PrivateDataCatalogInsertDragger';
import store from '../../../store';
import { changeUploadFileVisible,setUploadFileStepCurrent } from "../../../store/actionCreates";
import st from './PrivateDataCatalogInsert.less';


//新增数据配置信息
const steps = [{
    title: '上传文件',
    content: 'First-content',
  }, {
    title: '预览数据',
    content: 'Second-content',
  }, {
    title: '完成上传',
    content: 'Last-content',
  }];



class PrivateDataCatalogInsert extends Component {
  constructor(props){
      super(props);
      this.state = store.getState();
      this.handleStoreChange = this.handleStoreChange.bind(this);
      store.subscribe(this.handleStoreChange); 

  }

  showModal = () => {
    const isVisible = true;
    const action = changeUploadFileVisible(isVisible);
    store.dispatch(action);
  }

  handleCancel = (e) => {
    const isVisible = false;
    const action = changeUploadFileVisible(isVisible);
    store.dispatch(action);
  }

  next() {
    const current = this.state.uploadFileStepCurrent + 1;
    const action = setUploadFileStepCurrent(current);
    store.dispatch(action);
  }

  prev() {
    const current = this.state.uploadFileStepCurrent - 1;
    const action = setUploadFileStepCurrent(current);
    store.dispatch(action);
  }

  render() {
    const Step = Steps.Step;
    return (
      <Fragment>
          <Button type="primary" onClick={this.showModal}>导入数据</Button>
          <Modal
            visible={this.state.uploadFileVisible}
            title="导入数据"
            width='1000px'
            onCancel={this.handleCancel}
            footer=""
          >
            <Steps size="small" current={this.state.uploadFileStepCurrent}>
                {steps.map(item => <Step key = {item.title} title = {item.title}/>)}
            </Steps>
            <div className={st.stepsContent}>
                {
                    this.state.uploadFileStepCurrent===0 && 
                    <PrivateDataCatalogInsertDragger
                      toNext={this.next.bind(this)}
                    ></PrivateDataCatalogInsertDragger>
                }
                {
                    this.state.uploadFileStepCurrent===1 && 
                    <div style={{fontSize:'12px'}}>
                      <PrivateDataCatalogInsertDataView></PrivateDataCatalogInsertDataView>
                    </div>
                }
                {
                    this.state.uploadFileStepCurrent===2 && <div>333</div>
                }
            </div>
            <div className={st.stepsAction}>
                {
                    this.state.uploadFileStepCurrent < steps.length - 1
                    && <Button type="primary" onClick={() => this.next()}>继续</Button>
                }
                {
                    this.state.uploadFileStepCurrent === steps.length - 1
                    && <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
                }
                {
                    this.state.uploadFileStepCurrent > 0
                    && (
                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    后退
                    </Button>
                    )
                }
            </div>
          </Modal>
      </Fragment>
    )
  }




  handleStoreChange = () => {
    this.setState(store.getState());
  }
}


export default PrivateDataCatalogInsert;