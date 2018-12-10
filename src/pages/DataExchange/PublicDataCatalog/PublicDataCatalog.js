import { Component, Fragment } from 'react';
import { List, Avatar, Icon, Input, Form, Button, Tooltip,Card } from 'antd';
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
import st from '../DataExchange.less';


const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);
const { Meta } = Card;

class PublicDataCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState();   
        this.handleStoreChange = this.handleStoreChange.bind(this);
        store.subscribe(this.handleStoreChange);  

        this.getOpenData = this.getOpenData.bind(this);
        this.handleResetOpenDataCatalog = this.handleResetOpenDataCatalog.bind(this);
        
    }

    componentDidMount() {
        axios.post(requestGetShareData).then((res) => {
            const data = res.data;
            window.openDataCatalog = data;
            const action = initOpenShareDataList(data,'');
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
                style={{margin:'30px 0'}}
                grid={{ gutter: 24, column: 4 }}
                dataSource={this.state.openDataCatalog}
                pagination={{
                    onChange: (page) => {
                        console.log(page)
                    },
                    pageSize: 12
                }}
                renderItem={item => (
                    <List.Item>
                        <Card
                            cover={<img alt="example" src={this.getTagImage(item.TagName)} />}
                            actions={[
                                <IconText type="star-o" text={item.ShareStarNum} />,
                                <IconText type="download" text={item.ShareDownloadNum} />,
                                <a>查看</a>
                            ]}
                        >
                            <Meta 
                                title={item.ShareDataTitle}
                                description={
                                    <Tooltip 
                                        title={item.ShareDataDesc}
                                        placement="rightTop"
                                        trigger="click"
                                    >
                                        <div className={st.intro}>{item.ShareDataDesc}</div>
                                    </Tooltip>
                                    }
                            />
                        </Card>
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