import { Component, Fragment } from 'react';
import { List, Icon, Input, Button } from 'antd';
import store from '../../store';
import { getSearchCatalogValueChange,getDataFilterTagListGet } from "../../store/actionCreates";
import axios from 'axios';
import { requestGetTag } from '../../Common/requestUrl';
import st from './DataExchange.less';


class DataFilter extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        this.handleSearchCatalogValueChange = this.handleSearchCatalogValueChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);              //订阅Store
    }

    componentDidMount(){
        axios.post(requestGetTag).then((res) => {
            const data = res.data;
            let tags =[];
            res.data.map((item) => {
                tags.push(item.TagName);
            });
            //console.log(tags)
            const action = getDataFilterTagListGet(tags);
            store.dispatch(action);
        })
    }

    render(){

        return (
            <Fragment>
                <div className={st.filterWarp}>
                    <div>
                        <label 
                            htmlFor="inputSearchCatalogName"
                            style={{margin:'10px 0'}}
                        >
                            筛选：
                        </label>
                        <Input 
                            id="inputSearchCatalogName" 
                            style={{width:'400px',margin:'10px 15px'}} 
                            value={this.state.searchCatalogValue}
                            placeholder="请输入查询目录的名称"
                            onChange={this.handleSearchCatalogValueChange}
                        />
                        <Button 
                            type="primary"
                        >
                            查询
                        </Button>
                    </div>
                    <div>
                        <label>分类：</label>
                        <ul>
                            {this.getTagList()}
                        </ul>
                    </div>
                </div>
            </Fragment>
        )
    }

    //获取Tag标签列表
    getTagList(){
        return this.state.tagList.map((item,index)=>{
            return(
                <li
                    key={index}
                    className={this.state.selectedTag==item?st.tagActive:''}
                >
                    {item}
                </li>
            )
        });
    }

    handleSearchCatalogValueChange(e){
        const action = getDataFilterSearchValueChange(e.target.value);
        store.dispatch(action);
    }

    //将Search变化的值传回给State（使Input可视的值产生变化)
    handleStoreChange(){
        this.setState(store.getState());
    }
}

export default DataFilter;