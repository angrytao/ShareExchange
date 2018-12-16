import { Component, Fragment } from 'react';
import { message,Upload,Icon } from 'antd';
import { uploadShareDataFile } from '../../../Common/requestUrl';
import store from '../../../store';
import { getUploadFileData } from "../../../store/actionCreates";
import st from './PrivateDataCatalogInsert.less';

//上传组件
const Dragger = Upload.Dragger;

class PrivateDataCatalogInsertDragger extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange); 
  
        this.handleFileUploadChange = this.handleFileUploadChange.bind(this);
    }

    render(){
        return(
            <Fragment>
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
          this.props.toNext();
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
    }

    handleStoreChange = () => {
        this.setState(store.getState());
    }
}

export default PrivateDataCatalogInsertDragger;