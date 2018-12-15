import { Component, Fragment } from 'react';
import { Table  } from 'antd';

const cols=[
    {title:'xpoint',dataIndex:'xpoint',key:'xpoint'},
    {title:'ypoint',dataIndex:'ypoint',key:'ypoint'},
    {title:'title',dataIndex:'title',key:'title'},
    {title:'item',dataIndex:'item',key:'item'}
]
const data=[
    {key:'1',xpoint:'10.22',ypoint:'120.22',title:'hahaha',item:'jll'},
    {key:'2',xpoint:'10.22',ypoint:'120.22',title:'xxxsad',item:'yrt'},
    {key:'3',xpoint:'10.22',ypoint:'120.22',title:'hasfafghaha',item:'jgd'},
    {key:'4',xpoint:'10.22',ypoint:'120.22',title:'tiuvh',item:'xxx'}
]

class TableTest extends Component{
    render(){
        return(
            <div style={{marginTop:'10px'}}>
                <Table columns={cols} dataSource={data} size="small" ></Table>
            </div>
        )
    }
}

export default TableTest;