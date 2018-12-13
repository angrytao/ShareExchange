import { Component, Fragment } from 'react';
import { Steps, Icon, Input, Button, Modal, message, Upload } from 'antd';
import st from './PrivateDataCatalog.less';

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

class PrivateDataCatalogInsert extends Component {
  constructor(props){
      super(props);
      this.state = {
        visible: false,
        stepCurrent:0
      }
      this.handleFileUploadChange = this.handleFileUploadChange.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  next() {
    const current = this.state.stepCurrent + 1;
    this.setState({ stepCurrent:current });
  }

  prev() {
    const current = this.state.stepCurrent - 1;
    this.setState({ stepCurrent:current });
  }

  render() {
    const Step = Steps.Step;
    return (
      <Fragment>
          <Button type="primary" onClick={this.showModal}>导入数据</Button>
          <Modal
            visible={this.state.visible}
            title="导入数据"
            width='800px'
            onCancel={this.handleCancel}
            footer=""
          >
            <Steps size="small" current={this.state.stepCurrent}>
                {steps.map(item => <Step key = {item.title} title = {item.title}/>)}
            </Steps>
            <div className={st.stepsContent}>
                {
                    this.state.stepCurrent===0 && 
                    <div>
                        <Dragger 
                            name= 'UploadFiles'
                            multiple= 'false'
                            action= '//jsonplaceholder.typicode.com/posts/'
                            onChange={this.handleFileUploadChange}
                        >
                            <p className="ant-upload-drag-icon" style={{margin:'20px 0'}}><Icon type="plus-square"/></p>
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
                    this.state.stepCurrent===1 && <div>222</div>
                }
                {
                    this.state.stepCurrent===2 && <div>333</div>
                }
            </div>
            <div className={st.stepsAction}>
                {
                    this.state.stepCurrent < steps.length - 1
                    && <Button type="primary" onClick={() => this.next()}>继续</Button>
                }
                {
                    this.state.stepCurrent === steps.length - 1
                    && <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
                }
                {
                    this.state.stepCurrent > 0
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

  handleFileUploadChange(info) {
    debugger;
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} 文件上传成功.`);
      this.next();
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
}


export default PrivateDataCatalogInsert;