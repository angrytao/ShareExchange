import { Component, Fragment } from 'react';
import ReactEcharts from 'echarts-for-react';
import { Row, Col } from 'antd';


  class Statistics extends Component {
    render(){
        
        return(
            <Row>
                <Col span={8}>
                    <ReactEcharts option={this.getHotOption()} />
                </Col>
                <Col span={16}>
                    <ReactEcharts option={this.getTypeOption()} />
                </Col>
            </Row>
        )
    }

    getHotOption(){
        return({
            title: {
                text: '数据使用排行'
            },
            tooltip: {},
            xAxis: {
                data: ['三产', '公交站点', '平湖市小学', '社区警卫室', '平湖市中学']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10]
            }]  
        })
    }

    getTypeOption(){
        return({
            title: {
                text: '数据使用排行'
            },
            tooltip: {},
            calculable : true,
            series : [
                {
                    name:'面积模式',
                    type:'pie',
                    radius : [40, 120],
                    roseType : 'area',
                    data:[
                        {value:10, name:'交通'},
                        {value:5, name:'安全'},
                        {value:15, name:'教育'},
                        {value:25, name:'医疗卫生'},
                        {value:20, name:'社区'},
                        {value:35, name:'统计'},
                        {value:30, name:'财政税收'},
                        {value:40, name:'其他'}
                    ]
                } 
            ]
        })
    }
  }

  export default Statistics;