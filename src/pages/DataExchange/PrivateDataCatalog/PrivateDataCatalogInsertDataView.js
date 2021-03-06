import { Component, Fragment } from 'react';
import { Radio,Select,Table } from 'antd';
import store from '../../../store';
import { setUploadFileGeomFieldType } from "../../../store/actionCreates";
import st from './PrivateDataCatalogInsert.less';

const RadioGroup = Radio.Group;
const Option = Select.Option;

class PrivateDataCatalogInsertDataView extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange); 

        this.handleGeomFieldTypeChange = this.handleGeomFieldTypeChange.bind(this);
        this.returnCols = this.returnCols.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleLngChange = this.handleLngChange.bind(this);
        this.handleLatChange = this.handleLatChange.bind(this);
        this.handleWktChange = this.handleWktChange.bind(this);
    }

    render(){
        return(
            <Fragment>
                <p style={{fontWeight:'bold'}}>请选择数据空间化类型</p>
                <RadioGroup onChange={this.handleGeomFieldTypeChange} value={this.state.uploadFileGeomFieldType} size={"small"}>
                    <Radio value={'经纬度'}>经纬度</Radio>
                    <Radio value={'WKT格式'}>WKT格式</Radio>
                    <Radio value={'不含空间字段'}>不含空间字段</Radio>
                </RadioGroup>
                <div style={{margin:'10px 0'}}>
                    <label style={{marginRight:'10px'}}>标题</label>
                    <Select defaultValue={window.selectTitle} size={"small"} style={{width:100,marginRight:'10px'}} onChange={this.handleTitleChange}>
                        {this.state.uploadFileReturnDataThead.map((item,index) => <Option key={index}>{item}</Option>)}
                    </Select>
                {
                    this.state.uploadFileGeomFieldType==='经纬度' &&
                    <Fragment>
                        <label style={{marginRight:'10px'}}>经度</label>
                        <Select defaultValue={window.selectlng} size={"small"} style={{width:100}} onChange={this.handleLngChange}>
                            {this.state.uploadFileReturnDataThead.map((item,index) => <Option key={index}>{item}</Option>)}
                        </Select>
                        <label style={{margin:'0 10px'}}>纬度</label>
                        <Select defaultValue={window.selectlat} size={"small"} style={{width:100}} onChange={this.handleLatChange}>
                            {this.state.uploadFileReturnDataThead.map((item,index) => <Option key={index}>{item}</Option>)}
                        </Select>
                    </Fragment>
                }
                {
                    this.state.uploadFileGeomFieldType==='WKT格式' &&
                    <Fragment>
                        <label style={{marginRight:'10px'}}>空间字段</label>
                        <Select defaultValue={window.selectWkt}  size={"small"} style={{width:100}} onChange={this.handleWktChange}>
                            {this.state.uploadFileReturnDataThead.map((item,index) => <Option key={index}>{item}</Option>)}
                        </Select>
                    </Fragment>
                }
                {
                    this.state.uploadFileGeomFieldType==='不含空间字段' &&
                    <Fragment>
                        不含位置信息，将以普通表格类型进行上传
                    </Fragment>
                }
                </div>
                
                <Table columns={this.returnCols()} dataSource={this.state.uploadFileReturnDataTbody} size="small" rowClassName={st.tableRowsFontSize}></Table>
            </Fragment>
        )
    }

    handleGeomFieldTypeChange = (e) =>{
        const selectValue = e.target.value;
        const action = setUploadFileGeomFieldType(selectValue);
        store.dispatch(action);
    }

    handleTitleChange = (e) =>{
        window.selectTitle = e;
    }

    handleLngChange = (e) =>{
        window.selectlng = e;
    }

    handleLatChange = (e) =>{
        window.selectlat = e;
    }
    
    handleWktChange = (e) =>{
        window.selectWkt = e;
    }

    returnCols(){
        const thead = this.state.uploadFileReturnDataThead;
        const cols=[];
        thead.map((item, index) => {
            let column = {title:item,dataIndex:item,key:index};
            cols.push(column);
        });
        return cols;
    }

    handleStoreChange = () => {
        this.setState(store.getState());
    }
}

export default PrivateDataCatalogInsertDataView;