import React from 'react';
import { Row, Col } from 'antd';
import qrCodePic from '../Images/qrCode.png'
import st from './Home.less';

const Footer = (props) =>{
    return (
        <div className={st.Footer}>
            <div className={st.content}>
                <Row>
                    <Col span={8} style={{borderRight:'1px solid #fff'}}>
                        <ul className={st.footer_friendship}>
                            <li><b>友情链接</b></li>
                            <li><a href='#'>平湖住建局</a></li>
                            <li><a href='http://map.pinghu.gov.cn:9000/'>天地图平湖</a></li>
                            <li><a href='http://www.zjjs.com.cn/'>浙江省住建厅</a></li>
                            <li><a href='http://www.jxbuild.gov.cn/'>嘉兴建委</a></li>
                        </ul>
                    </Col>
                    <Col span={8} style={{paddingLeft:'50px',borderRight:'1px solid #fff'}}>
                        <h2 style={{color:'#fff'}}>联系方式</h2>
                        <p style={{color:'#bbb'}}>地址：平湖市东湖大道617号</p>
                        <p style={{color:'#bbb'}}>电话：05xxxxxxxxx</p>
                        <p style={{color:'#bbb'}}>服务时间：9:00-17:00</p>
                    </Col>
                    <Col span={8} style={{paddingLeft:'50px',textAlign:'center'}}>
                        <h2 style={{color:'#fff'}}>住建平湖公众号</h2>
                        <img src={qrCodePic}></img>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Footer;