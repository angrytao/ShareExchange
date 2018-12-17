import { Component, Fragment } from 'react';
import { Row, Col, Select, Form, Button, Input, Icon } from 'antd';
import store from '../../../store';
import { setUploadFileGeomFieldType } from "../../../store/actionCreates";
import L from '../../../refs/leafletExtends';
import { mapConfig } from '../../../../config/ctconfig';
import st from './PrivateDataCatalogInsert.less';

const FormItem = Form.Item;
const { TextArea } = Input;

class PrivateDataCatalogInsertConfigForm extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange); 
    }

    initMap() {
        let dom = this.mapDom;
        let map = L.map(dom, {
            ...mapConfig,
            crs: L.CRS.EPSG4490,
            attributionControl: false,
            zoomControl: false,
        });
        L.tileLayer.getGroupLayer(['vec','vec_anno']).addTo(map);
        this.map = map;
    }

    getData(){
        let fileFormat = this.state.uploadFileGeomFieldType;
        let previewData = this.state.uploadFileReturnDataTbody;
        let thead = this.state.uploadFileReturnDataThead;

        if(fileFormat === "经纬度"){
            this.handleLatlngAddToMap(previewData,thead);
        }

        if(fileFormat === "WKT格式"){
            this.handleWKTAddToMap(previewData);
        }
    }

    handleLatlngAddToMap(data,head){
        let hlat = head[window.selectlat];
        let hlng = head[window.selectlng];
        this.currentLayer = L.layerGroup();

        data.map((item) => {
            let lat = parseFloat(item[hlat]);
            let lng = parseFloat(item[hlng]);
            let geom = L.latLng(lat,lng);
            for(let o in item){
                let i =o;
            }
            L.marker(geom).addTo(this.currentLayer);
        });

        this.currentLayer.addTo(this.map);
    }

    handleWKTAddToMap(){

    }


    componentDidMount() {
        this.initMap();
        this.getData();
        this.props.form.validateFields();
    }

    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 26 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        return(
            <Fragment>
                <Row>
                    <Col span={18}>
                        <div ref={e => (this.mapDom = e)} className={st.map}></div>
                    </Col>
                    <Col span={6}>
                        <h3 style={{fontWeight:'bold',marginLeft:'10px'}}><Icon type="shake" style={{marginRight:'5px'}}/>数据发布</h3>
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="标题"
                            >
                                {getFieldDecorator('ShareDataTitle',{
                                    rules:[{required:true,message:'标题不能为空!'}]
                                })(<Input />)}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="标签"
                            >
                                {getFieldDecorator('TagId')(<Select></Select>)}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="描述"
                            >
                                {getFieldDecorator('ShareDataDesc')(<TextArea />)}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="其他"
                            >
                                {
                                    this.state.uploadFileGeomFieldType === "经纬度" &&
                                    <div style={{fontSize:'12px',lineHeight:'20px',marginTop:'10px'}}>
                                        格式-经纬度<br />经度字段-{this.state.uploadFileReturnDataThead[window.selectlng]}<br />纬度字段-{this.state.uploadFileReturnDataThead[window.selectlat]}
                                    </div>
                                }
                                {
                                    this.state.uploadFileGeomFieldType === "WKT格式" &&
                                    <div style={{fontSize:'12px',lineHeight:'20px',marginTop:'10px'}}>
                                        格式-WKT格式<br />空间字段-{this.state.uploadFileReturnDataThead[window.selectWkt]}
                                    </div>
                                }
                                {
                                    this.state.uploadFileGeomFieldType === "不含空间字段" &&
                                    <div style={{fontSize:'12px',lineHeight:'20px',marginTop:'10px'}}>
                                        格式-不含空间字段
                                    </div>
                                }
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="primary"
                                    style={{width:'100%'}}
                                >
                                    <Icon type="cloud-upload" />发布
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>

            </Fragment>
        )
    }
    
    handleStoreChange = () => {
        this.setState(store.getState());
      }
}
const PrivateDataCatalogInsertConfig = Form.create()(PrivateDataCatalogInsertConfigForm);

export default PrivateDataCatalogInsertConfig;