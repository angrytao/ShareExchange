import {Fragment,Component} from 'react';
import {Table} from 'antd';

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
        this.state.title = data[this.props.itemTitle];
        
        const list = [];
        for(let key in data){
            if(key != this.props.itemTitle){
                list.push({Key:key,Value:data[key]});
            }
        }
        this.state.content = list;
    }

   

    render(){
        console.log(this.state.content);
        return(
            <div>
                <h3>{this.state.title}</h3>
                <Table size={"small"} pagination={false} columns={cols} dataSource={this.state.content} scroll={{ y: 200 }}></Table>
            </div>
        )
    }
}

export default Popup;