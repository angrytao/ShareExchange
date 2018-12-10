import { Component, Fragment } from 'react';
import { Icon, Input, Button } from 'antd';
import store from '../../store';
import { getDataFilterTagListGet, getDataFilterSearchValueChange } from '../../store/actionCreates';
import { requestGetTag } from '../../Common/requestUrl';
import axios from 'axios';
import st from './DataExchange.less';

class Selector extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
        //订阅Store
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);  
        
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleSearchCatalogValueChange = this.handleSearchCatalogValueChange.bind(this);
        this.getTagList = this.getTagList.bind(this);
        this.handleClick = this.handleClick.bind(this);
            
    }

    componentDidMount(){
        axios.post(requestGetTag).then((res) => {
            const data = res.data;
            let tags =[];
            res.data.map((item) => {
                tags.push(item.TagName);
            });
            const action = getDataFilterTagListGet(tags);
            store.dispatch(action);
        })
    }

    render(){
        return(
            <div className={st.selector}>
                <div className={st.selectorLine}>
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
                        onClick={this.handleSearchClick}
                    >
                        查询
                    </Button>
                    <Button
                        style={{marginLeft:'15px'}}
                        onClick={this.handleResetClick}
                    >
                        重置
                    </Button>
                </div>
                <div className={st.selectorLine}>
                    <label>分类：</label>
                    <ul>
                        {this.getTagList()}
                    </ul>
                </div>
            </div>
        )
    }

    //返回查询框变化
    handleSearchCatalogValueChange = (e) => {
        const searchValue = e.target.value;
        const action = getDataFilterSearchValueChange(searchValue);
        store.dispatch(action);
    }

    //获取Tag标签列表
    getTagList = () => {
        return this.state.tagList.map((item,index)=>{
            return(
                <li
                    key={index}
                    className={this.state.selectedTag==item?st.tagActive:''}
                    onClick={this.handleClick}
                >
                    {item}
                </li>
            )
        });
    }

    //查询按钮点击事件
    handleSearchClick = () => {
        this.props.searchName();
    }

    //重置按钮点击事件
    handleResetClick = () => {
        this.props.resetData();
    }

    //Tag点击事件
    handleClick = (e) => {
        const tagType = e.target.outerText;
        this.props.tagSelect(tagType);
    }

    //将Search变化的值传回给State
    handleStoreChange = () => {
        this.setState(store.getState());
    }
}

export default Selector;