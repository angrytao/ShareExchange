import { Component, Fragment } from 'react';
import { List, Avatar, Icon, Input, Form, Button, Tooltip } from 'antd';
import axios from 'axios';
import { requestGetShareData } from '../../../Common/requestUrl';
import store from '../../../store';
import { initOpenShareDataList } from "../../../store/actionCreates";
import tag1 from '../../images/tag1.png';
import tag2 from '../../images/tag2.png';
import tag3 from '../../images/tag3.png';
import tag4 from '../../images/tag4.png';
import tag5 from '../../images/tag5.png';
import tag6 from '../../images/tag6.png';
import tag7 from '../../images/tag7.png';
import tag8 from '../../images/tag8.png';
import tag9 from '../../images/tag9.png';
import Selector from '../Selector';


const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);


class PublicDataCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.handleResetOpenDataCatalog = this.handleResetOpenDataCatalog.bind(this);
        this.getOpenData = this.getOpenData.bind(this);
        store.subscribe(this.handleStoreChange);    
    }

    componentDidMount() {
        axios.post(requestGetShareData).then((res) => {
            const data = res.data;
            window.openDataCatalog = data;
            const action = initOpenShareDataList(data);
            store.dispatch(action);
        });
    }

    render(){
        return (
            <Fragment>
                <Selector 
                    tagSelect={this.handleTagSelect.bind(this)}
                    searchName={this.handleSearchOpenCatalog.bind(this)}
                    resetData={this.handleResetOpenDataCatalog.bind(this)}
                >
                </Selector>
                {this.getOpenData()}
            </Fragment>
        )
    }

    //获取开放数据目录
    getOpenData = () => {
        return (
            <List
                itemLayout="vertical"
                style={{marginBottom:'30px'}}
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page)
                    },
                    pageSize: 5
                }}
                dataSource={this.state.openDataCatalog}
                footer={<div><b>公共开放数据</b></div>}
                renderItem={item => (
                    <List.Item
                        key={item.ShareDataId}
                        actions={[
                            <IconText type="user" text={item.UserName} />,
                            <IconText type="star-o" text={item.ShareStarNum} />,
                            <IconText type="download" text={item.ShareDownloadNum} />
                        ]}
                        extra={<img width={170} alt="logo" src={this.getTagImage(item.TagName)} />}
                    >
                        <List.Item.Meta
                            title={<a>{item.ShareDataTitle}</a>}
                            description={item.ShareDataDesc}
                        />
                        <a href="#">查看</a> | <a href="#">下载</a>
                    </List.Item>
                )}
            >
            </List>
        )
    }

    //通过标签筛选
    handleTagSelect = (tagType) => {
        const openDataCatalogData = window.openDataCatalog.filter(item => item.TagName == tagType);
        const action = initOpenShareDataList([...openDataCatalogData],tagType);
        store.dispatch(action);
    }

    //通过目录名筛选
    handleSearchOpenCatalog = () => {
        const searchContent = this.state.searchCatalogValue;
        const DataCatalog = window.openDataCatalog;
        const openDataCatalogData = typeof (searchContent) != "undefined" ? DataCatalog.filter(item => item.ShareDataTitle.indexOf(searchContent) >= 0) : DataCatalog;
        const action = initOpenShareDataList(openDataCatalogData,'');
        store.dispatch(action);
    }

    //重置开放数据目录
    handleResetOpenDataCatalog = (e) => {
        const action = initOpenShareDataList(window.openDataCatalog,'');
        store.dispatch(action);
    }

    //获取标签图片
    getTagImage = (tag) => {
        switch (tag) {
            case '统计':
                return tag1;
            case '交通':
                return tag2;
            case '测绘':
                return tag3;
            case '财政税收':
                return tag4;
            case '教育':
                return tag5;
            case '医疗卫生':
                return tag6;
            case '社区':
                return tag7;
            case '安全':
                return tag8;
            default:
                return tag9;
        }
    }

    handleStoreChange = () => {
        this.setState(store.getState());
    }
}

export default PublicDataCatalog;