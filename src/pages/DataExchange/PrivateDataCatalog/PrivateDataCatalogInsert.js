import { Component, Fragment } from 'react';
import { Steps, Icon, Input, Button, Modal, message, Upload, Radio, Select } from 'antd';
import { uploadShareDataFile } from '../../../Common/requestUrl';
import PrivateDataCatalogInsertDataView from './PrivateDataCatalogInsertDataView';
import store from '../../../store';
import { getUploadFileData,changeUploadFileVisible,setUploadFileStepCurrent,setUploadFileGeomFieldType } from "../../../store/actionCreates";
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

//上传组件
const Dragger = Upload.Dragger;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class PrivateDataCatalogInsert extends Component {
  constructor(props){
      super(props);
      this.state = store.getState();
      this.handleStoreChange = this.handleStoreChange.bind(this);
      store.subscribe(this.handleStoreChange); 

      this.handleFileUploadChange = this.handleFileUploadChange.bind(this);
      this.handleGeomFieldTypeChange = this.handleGeomFieldTypeChange.bind(this);
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
                    <div>
                        <Dragger 
                            name= 'UploadFiles'
                            multiple= 'false'
                            action= {uploadShareDataFile}
                            onChange={this.handleFileUploadChange}
                        >
                            <p className="ant-upload-drag-icon" style={{margin:'40px 0'}}><Icon type="plus-square"/></p>
                            <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                            <p className="ant-upload-hint">支持Excel、CSV表格文件，以及txt文本文件</p>
                        </Dragger>
                        <div className={st.footer}>
                            <p>表格式文件说明</p>
                            <ul className={st.file}>
                                <li>请上传有标准行列的一维数据表格。（有合并单元格的数据请处理过后再上传，否则可能出现表头识别有误）</li>
                                <li>日期字段需包含年月日（如2016/1/1），或年月日时分秒（如2016/1/1 00:00:00）</li>
                                <li>在地图上呈现时需包含地址或经纬度，详见数据模板</li>
                            </ul>
                        </div>
                    </div>
                }
                {
                    this.state.uploadFileStepCurrent===1 && 
                    <div style={{fontSize:'12px'}}>
                      <p style={{fontWeight:'bold'}}>请选择数据空间化类型</p>
                      <RadioGroup onChange={this.handleGeomFieldTypeChange} value={this.state.uploadFileGeomFieldType} size={"small"}>
                        <Radio value={'经纬度'}>经纬度</Radio>
                        <Radio value={'WKT格式'}>WKT格式</Radio>
                        <Radio value={'不含空间字段'}>不含空间字段</Radio>
                      </RadioGroup>
                      {
                        this.state.uploadFileGeomFieldType==='经纬度' &&
                        <div style={{margin:'10px 0'}}>
                          <label style={{marginRight:'10px'}}>经度</label>
                          <Select size={"small"} style={{width:100}}>
                            {this.state.uploadFileReturnDataThead.map((item,index) => <Option key={index}>{item}</Option>)}
                          </Select>
                          <label style={{margin:'0 10px'}}>纬度</label>
                          <Select size={"small"} style={{width:100}}>
                            {this.state.uploadFileReturnDataThead.map((item,index) => <Option key={index}>{item}</Option>)}
                          </Select>
                        </div>
                      }
                      {
                        this.state.uploadFileGeomFieldType==='WKT格式' &&
                        <div style={{margin:'10px 0'}}>
                          <label style={{marginRight:'10px'}}>空间字段</label>
                          <Select size={"small"} style={{width:100}}>
                            {this.state.uploadFileReturnDataThead.map((item,index) => <Option key={index}>{item}</Option>)}
                          </Select>
                        </div>
                      }
                      {
                        this.state.uploadFileGeomFieldType==='不含空间字段' &&
                        <div style={{margin:'10px 0'}}>不含位置信息，将以普通表格类型进行上传</div>
                      }
         
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

  handleFileUploadChange = (info) => {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info);
      console.log('uploading');
    }
    if (status === 'done') {
      message.success(`${info.file.name} 文件上传成功.`);
      //console.log(info.file);
      const action = getUploadFileData(info.file.response.Data.Data);
      store.dispatch(action);
      this.next();
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  handleGeomFieldTypeChange = (e) =>{
    const selectValue = e.target.value;
    const action = setUploadFileGeomFieldType(selectValue);
    store.dispatch(action);
  }

  handleStoreChange = () => {
    this.setState(store.getState());
  }
}


export default PrivateDataCatalogInsert;