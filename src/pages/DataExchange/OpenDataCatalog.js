import { Component, Fragment } from 'react';
import { List, Avatar, Icon, Input ,Form, Button, Tooltip } from 'antd';
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
const FormItem = Form.Item; 
const DataCatalog =[
    {
        ShareDataId:'1',
        ShareDataTitle:'数据1',
        ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
        ShareDataPubdate:'2018-11-30 13:22:33',
        ShareStarNum:10,
        ShareDownloadNum:22,
        TagName:'教育',
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
        ShareDataTitle:'数据2',
        ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
        ShareDataPubdate:'2018-11-30 13:22:33',
        ShareStarNum:10,
        ShareDownloadNum:22,
        TagName:'财政税收',
        UserName:'用户01'
    },
    {
        ShareDataId:'4',
        ShareDataTitle:'数据2',
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
        TagName:'医疗卫生',
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
    },
    {
        ShareDataId:'10',
        ShareDataTitle:'数据3',
        ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
        ShareDataPubdate:'2018-11-30 13:22:33',
        ShareStarNum:10,
        ShareDownloadNum:22,
        TagName:'统计',
        UserName:'用户01'
    },
    {
        ShareDataId:'11',
        ShareDataTitle:'数据3',
        ShareDataDesc:'这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据,这是一组测试数据',
        ShareDataPubdate:'2018-11-30 13:22:33',
        ShareStarNum:10,
        ShareDownloadNum:22,
        TagName:'医疗卫生',
        UserName:'用户01'
    }
];

function query(arr, q) {
    return arr.filter(v => Object.values(v).some(v => new RegExp(q + '').test(v))
    )
  }

class OpenDataCatalog extends Component{
    constructor(props){
        super(props);
        this.state={
            tagList:['全部','统计','财政税收','交通','安全','测绘','医疗卫生','教育','社区'],
            selectedTag:'全部',
            dataCatalog:[...DataCatalog]
        }
        this.handleTagSelect = this.handleTagSelect.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return (
            <Fragment>
                <div className={st.filterWarp}>
                    <Form layout="inline" style={{marginBottom:'10px'}} onSubmit={this.handleSearch}>
                        <FormItem>
                            <label htmlFor="inputCatalogName" style={{lineHeight:'40px'}}>筛选：</label>
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('searchCatalogName',{})(
                                <Input id="inputCatalogName" style={{width:'400px'}} placeholder="请输入查询目录的名称"/>
                            )}
                        </FormItem>
                        <FormItem>
                            <Button 
                                type="primary"
                                htmlType="submit"
                            >
                                查询
                            </Button>
                        </FormItem>
                    </Form>
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
    
    //按名字进行查询
    handleSearch = (e) => {
        e.preventDefault();
        const searchContent = this.props.form.getFieldValue('searchCatalogName');
        // const filterList = typeof(searchContent) != "undefined" ??DataCatalog.filter(item=>item.ShareDataTitle==searchContent):DataCatalog;
        const filterList = typeof(searchContent) != "undefined" ? DataCatalog.filter(item=>item.ShareDataTitle.indexOf(searchContent)>=0) : DataCatalog;
        //console.log(searchContent);
        this.setState({
            dataCatalog:[...filterList]
        });
    }

    //获取Tag标签列表
    getTagList(){
        return this.state.tagList.map((item,index)=>{
            return(
                <li
                    key={index}
                    onClick={this.handleTagSelect}
                    className={this.state.selectedTag==item?st.tagActive:''}
                >
                    {item}
                </li>
            )
        });
    }

    //Tag标签筛选开放数据目录
    handleTagSelect = (e) => {
        const tagType = e.target.outerText;
        const filterList = tagType!='全部'?DataCatalog.filter(item=>item.TagName==tagType):DataCatalog;
        // console.log(filterList);
        this.setState({
            dataCatalog:[...filterList],
            selectedTag:tagType
        });
    }

    //获取开放数据目录
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
                        actions={[
                                    <IconText type="user" text={item.UserName} />,
                                    <IconText type="star-o" text={item.ShareStarNum} />,
                                    <IconText type="download" text={item.ShareDownloadNum}/>
                                    
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


    //
    getTagImage(tag){
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
    }
    
}

//Form.create之后，拿到this.props.form
OpenDataCatalog = Form.create()(OpenDataCatalog);
export default OpenDataCatalog;