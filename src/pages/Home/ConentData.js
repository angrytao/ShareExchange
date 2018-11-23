import React  from 'react';
import { Row, Col } from 'antd';
import dataPic1 from './images/Logo_s.png';
import st from './Home.less';

const ConentData = (props) =>{
    return (
        <div className={st.content_Data}>
            <div className={st.content}>
                <div className={st.content_title}>
                    数据共享交换
                </div>
                <Row>
                    <Col className={st.content_Data_item} span={8}>
                        <img src={dataPic1}></img>
                        批量导入
                    </Col>
                    <Col className={st.content_Data_item} span={8} style={{background:'#fff'}}>数据编辑</Col>
                    <Col className={st.content_Data_item} span={8}>数据目录</Col>
                </Row>
            </div>
        </div>
    )
}

export default ConentData;