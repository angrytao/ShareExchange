import { Component, Fragment } from 'react';
import { Radio,Select,Table } from 'antd';
import store from '../../../store';
import { setUploadFileGeomFieldType } from "../../../store/actionCreates";
import L from '../../../refs/leafletExtends';
import { mapConfig } from '../../../../config/ctconfig';
import st from './PrivateDataCatalogInsert.less';

class PrivateDataCatalogInsertConfig extends Component{
    constructor(props){
        super(props);
    }

    initMap() {
        let dom = this.mapDom;
        let map = L.map(dom, {
            ...mapConfig,
            crs: L.CRS.EPSG4490,
            attributionControl: false,
            zoomControl: false,
        });
        this.map = map;
    }

    getData(){
        
    }

    componentDidMount() {
        this.initMap();
    }

    render(){
        return(
            <Fragment>
                <div ref={e => (this.mapDom = e)} className={st.map}></div>
                <div></div>
            </Fragment>
        )
    }
    
}

export default PrivateDataCatalogInsertConfig;