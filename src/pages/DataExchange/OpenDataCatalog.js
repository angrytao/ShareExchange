import { Component, Fragment } from 'react';
import { List, Avatar, Icon } from 'antd';
import tag1 from '../images/tag1.png';
import tag2 from '../images/tag2.png';
import tag3 from '../images/tag3.png';
import tag4 from '../images/tag4.png';
import tag5 from '../images/tag5.png';
import tag6 from '../images/tag6.png';
import tag7 from '../images/tag7.png';
import tag8 from '../images/tag8.png';
import tag9 from '../images/tag9.png';
import st from './DataExchange.less';

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);
    

class OpenDataCatalog extends Component{
    constructor(props){
        super(props);
        this.state={
            tagList:['全部','统计','财政税收','交通','安全','测绘','医疗卫生','教育','社区'],
            dataCatalog:[
                {
                    ShareDataId:'1',
                    ShareDataTitle:'数据1',
                    ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
                    ShareDataPubdate:'2018-11-30 13:22:33',
                    ShareStarNum:10,
                    ShareDownloadNum:22,
                    TagName:'统计',
                    UserName:'用户01'
                },
                {
                    ShareDataId:'2',
                    ShareDataTitle:'数据1',
                    ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
                    ShareDataPubdate:'2018-11-30 13:22:33',
                    ShareStarNum:10,
                    ShareDownloadNum:22,
                    TagName:'交通',
                    UserName:'用户01'
                },
                {
                    ShareDataId:'3',
                    ShareDataTitle:'数据1',
                    ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
                    ShareDataPubdate:'2018-11-30 13:22:33',
                    ShareStarNum:10,
                    ShareDownloadNum:22,
                    TagName:'财政税收',
                    UserName:'用户01'
                },
                {
                    ShareDataId:'4',
                    ShareDataTitle:'数据1',
                    ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
                    ShareDataPubdate:'2018-11-30 13:22:33',
                    ShareStarNum:10,
                    ShareDownloadNum:22,
                    TagName:'测绘',
                    UserName:'用户01'
                },
                {
                    ShareDataId:'5',
                    ShareDataTitle:'数据1',
                    ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
                    ShareDataPubdate:'2018-11-30 13:22:33',
                    ShareStarNum:10,
                    ShareDownloadNum:22,
                    TagName:'其他',
                    UserName:'用户01'
                },
                {
                    ShareDataId:'6',
                    ShareDataTitle:'数据1',
                    ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
                    ShareDataPubdate:'2018-11-30 13:22:33',
                    ShareStarNum:10,
                    ShareDownloadNum:22,
                    TagName:'安全',
                    UserName:'用户01'
                },
                {
                    ShareDataId:'7',
                    ShareDataTitle:'数据1',
                    ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
                    ShareDataPubdate:'2018-11-30 13:22:33',
                    ShareStarNum:10,
                    ShareDownloadNum:22,
                    TagName:'社区',
                    UserName:'用户01'
                },
                {
                    ShareDataId:'8',
                    ShareDataTitle:'数据1',
                    ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
                    ShareDataPubdate:'2018-11-30 13:22:33',
                    ShareStarNum:10,
                    ShareDownloadNum:22,
                    TagName:'测绘',
                    UserName:'用户01'
                },
                {
                    ShareDataId:'9',
                    ShareDataTitle:'数据1',
                    ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
                    ShareDataPubdate:'2018-11-30 13:22:33',
                    ShareStarNum:10,
                    ShareDownloadNum:22,
                    TagName:'统计',
                    UserName:'用户01'
                }
            ]
        }
        this.handleItemSelect = this.handleItemSelect.bind(this);
    }

    
    render(){
        return (
            <Fragment>
                <div className={st.filterWarp}>
                    <label>分类：</label>
                    <ul>
                        {this.getTagList()}
                    </ul>
                    <div className={st.clear}></div>
                </div>
                {this.getOpenData()}
            </Fragment>
        )
    }



    getTagList(){
        return this.state.tagList.map((item,index)=>{
            return(
                <li
                    key={index}
                    onClick={this.handleItemSelect}
                >
                {item}
                </li>
            )
        });
    }

    getOpenData(){
        return(
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange:(page) =>{
                        console.log(page)
                    },
                    pageSize: 4
                }}
                dataSource={this.state.dataCatalog}
                fonter ={<div><b>公共开放数据</b>this.state.dataCatalog.length</div>}
                renderItem={item => (
                    <List.Item
                        key={item.ShareDataId}
                        actions={[<IconText type="star-o" text={item.ShareStarNum} />,<IconText type="download" text={item.ShareDownloadNum}/>]}
                        extra={<img width={140} alt="logo" src={this.getTagName(item.TagName)} />}
                    >
                        <List.Item.Meta
                            title={<a>{item.ShareDataTitle}</a>}
                            description={item.ShareDataDesc}
                        />
                    </List.Item>
                )}
            >
            </List>
        )
    }

    handleItemSelect(e){
        console.log(e.target);
        console.log(e.target.value);
    }

    getTagName(tag){
        switch(tag){
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
        return tag1
    }
    
}

export default OpenDataCatalog;