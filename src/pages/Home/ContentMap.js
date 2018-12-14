import React from 'react';
import { Row, Col, Button } from 'antd';
import cmapPic from '../images/cMap.png';
import cmapPic1 from '../images/cMapSyb.png';
import cmapPic2 from '../images/cMapArc.png';
import cmapPic3 from '../images/cMapAuto.png';
import cmapPic4 from '../images/cMapDraw.png';
import st from './Home.less';

//无状态组件
const ContentMap = (props) =>{
    return (
        <div className={st.content_Map}>
            <div className={st.content}>
                <div className={st.content_title}>地图制图</div>
                <Row>
                    <Col span={12}>
                        <div className={st.content_quote}>"无需一行代码，脱离专业制图软件，地图制作无门槛。"</div>
                        <div className={st.content_Map_desc}>
                            提供快捷便利的制图功能，提供多源数据不同的可视化效果，提供地图控件的定制，可以将制作的专题地图进行分享。
                        </div>
                        <img src={cmapPic} className={st.content_Map_rightImg}></img>
                        <div style={{textAlign:'center',marginTop:'30px'}}>
                            <Button type="primary" size="large" icon="edit">开始在线制图</Button>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10} className={st.content_Map_itemGroup}>
                        
                        <div className={st.content_Map_itemGroup}>
                            <div className={st.content_Map_item}>
                                <div className={st.content_Map_item_img}>
                                    <img src={cmapPic1}></img>
                                </div>
                                <div className={st.content_Map_item_body}>
                                    <h3>数据选择</h3>
                                    <p>
                                        能够选取“数据开放目录”中数据叠加到地图上进行二次编辑、空间化。
                                    </p>
                                </div>
                            </div>
                            <div className={st.content_Map_item}>
                                <div className={st.content_Map_item_img}>
                                    <img src={cmapPic2}></img>
                                </div>
                                <div className={st.content_Map_item_body}>
                                    <h3>服务加载</h3>
                                    <p>
                                        支持加载ArcGIS标准的常用服务、OGC标准的常用服务。
                                    </p>
                                </div>
                            </div>
                            <div className={st.content_Map_item}>
                                <div className={st.content_Map_item_img}>
                                    <img src={cmapPic3}></img>
                                </div>
                                <div className={st.content_Map_item_body}>
                                    <h3>自定义绘制</h3>
                                    <p>
                                        提供多种类型（点、线、面、圆形）的空间要素在地图的绘制服务。
                                    </p>
                                </div>
                            </div>
                            <div className={st.content_Map_item}>
                                <div className={st.content_Map_item_img}>
                                    <img src={cmapPic4}></img>
                                </div>
                                <div className={st.content_Map_item_body}>
                                    <h3>多种空间表达方式</h3>
                                    <p>
                                        提供热力图、聚合图、迁徙图等多种空间可视化表现方式。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            
        </div>
    )
}

export default ContentMap;