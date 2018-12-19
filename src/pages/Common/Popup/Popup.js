import {Fragment,Component} from 'react';
import {Table} from 'antd';
import st from './Popup.less';

const cols = [{
    title:'属性',
    dataIndex:'Key',
    key:'Key'
},
{
    title:'内容',
    dataIndex:'Value',
    key:'Value'
}];

class Popup extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            content:[]
        };
    }

    componentWillMount(){
        let data = this.props.itemData;
        let geoms = this.props.itemGeom;
        this.state.title = data[this.props.itemTitle];
        
        const list = [];
        for(let key in data){
            //字段过滤标题、空间字段
            if(key != this.props.itemTitle && geoms.indexOf(key) === -1){
                list.push({Key:key,Value:data[key]});
            }
        }
        this.state.content = list;
    }

   

    render(){
        console.log(this.state.content);
        return(
            <div>
                <h3 className={st.title}>{this.state.title}</h3>
                <Table 
                    size={"small"} 
                    pagination={false} 
                    columns={cols} 
                    dataSource={this.state.content} 
                    scroll={{ y: 200 }}
                >
                </Table>
            </div>
        )
    }
}

export default Popup;