import React from 'react';
import { Carousel, Row, Col, Divider, Button } from 'antd';
import cCasePic1 from '../Images/cCase1.png';
import cCasePic2 from '../Images/cCase2.png';
import cCasePic3 from '../Images/cCase3.png';
import st from './Home.less';

//无状态组件
const ContentCase = (props) => {
    return(
        <div className={st.content_Case}>
            <div className={st.content}>
                <div className={st.content_title}>综合案例</div>
                <Carousel autoplay>
                    <div className={st.content_Case_item}>
                        <Row>
                            <Col span={10}>
                                <img src={cCasePic1}></img>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={12}>
                                <h2>Arcgis API项目示例</h2>
                                <div>
                                    <Divider orientation="right">Arcgis API for JavaScript 3.x</Divider>
                                    <p>提供Arcgis API 3.x版本的项目示例，3.x版本是面向二维地图提供地理信息系统建设框架。</p>
                                    <Divider orientation="left">Arcgis API for JavaScript 4.x</Divider>
                                    <p>提供Arcgis API 4.x版本的项目示例，4.x版本是面向三维地图提供地理信息系统建设框架。</p>
                                </div>
                                <Button icon="select">查看</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className={st.content_Case_item}>
                        <Row>
                            <Col span={10}>
                                <img src={cCasePic2}></img>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={12}>
                                <h2>EChart API项目示例</h2>
                                <div>
                                    <Divider orientation="right">EChart 特性</Divider>
                                    <p>ECharts，一个使用 JavaScript 实现的开源可视化库，可用于常规数据的统计图表，也可用于地理数据可视化的地图，例如地图、热力图等。</p>
                                </div>
                                <Button icon="select">查看</Button>
                            </Col>
                        </Row>
                    </div>
                    <div className={st.content_Case_item}>
                        <Row>
                            <Col span={10}>
                                <img src={cCasePic3}></img>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={12}>
                                <h2>地图图册</h2>
                                <div>
                                    <Divider orientation="right">基于本平台的特色地图</Divider>
                                    <p>展示基于本平台开放数据目录、地图制图功能绘制的地图，为用户使用更好地使用本平台，提供思路。</p>
                                </div>
                                <Button icon="select">查看</Button>
                            </Col>
                        </Row>
                    </div>
                </Carousel>
                <div style={{textAlign:'center',marginTop:'30px'}}>
                    <Button type="primary" icon="ellipsis">查看更多</Button>
                </div>
                
            </div>
          
        </div>
    )
}

export default ContentCase;