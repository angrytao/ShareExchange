import { Component } from 'react';
import { Table } from 'antd';
import store from '../../../store';


class PrivateDataCatalogInsertDataView extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange); 
    }

    render(){
        console.log(this.state.uploadFileReturnDataTbody);
        return(
            // <Table dataSource={this.state.uploadFileReturnDataTbody}></Table>
            <div>1</div>
        )
    }

    handleStoreChange = () => {
        this.setState(store.getState());
    }
}

export default PrivateDataCatalogInsertDataView;