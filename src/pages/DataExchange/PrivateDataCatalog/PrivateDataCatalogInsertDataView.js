import { Component } from 'react';
import { Table } from 'antd';
import store from '../../../store';
import st from './PrivateDataCatalogInsert.less';

class PrivateDataCatalogInsertDataView extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange); 

        this.returnCols = this.returnCols.bind(this);
    }

    render(){
        return(
            <div>
                <Table columns={this.returnCols()} dataSource={this.state.uploadFileReturnDataTbody} size="small" rowClassName={st.tableRowsFontSize}></Table>
            </div>
        )
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