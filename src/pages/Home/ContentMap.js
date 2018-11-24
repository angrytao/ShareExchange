import React from 'react';
import { Row, Col, Button } from 'antd';
import cmapPic from '../images/cMap.png';
import cmapPic1 from '../images/cMapSyb.png';
import cmapPic2 from '../images/cMapArc.png';
import cmapPic3 from '../images/cMapAuto.png';
import cmapPic4 from '../images/cMapDraw.png';
import st from './Home.less';

const ContentMap = (props) =>{
    return (
        <div className={st.content_Map}>
            <div className={st.content}>
                <div className={st.content_title}>地图制图</div>
                <Row>
                    <Col span={12}>
                        <div className={st.content_Map_desc}>
                            提供快捷便利的制图功能，可以将制作的专题地图进行分享。
                        </div>
                        <img src={cmapPic} className={st.content_Map_rightImg}></img>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10} className={st.content_Map_itemGroup}>
                        
                        <div className={st.content_Map_itemGroup}>
                            <div className={st.content_Map_item}>
                                <div className={st.content_Map_item_img}>
                                    <img src={cmapPic1}></img>
                                </div>
                                <div className={st.content_Map_item_body}>
                                    <h2>数据选择</h2>
                                    <p>
                                        支持加载ArcGIS常用服务（动态、切片、要素）服务，支持OGC服务。
                                    </p>
                                </div>
                            </div>
                            <div className={st.content_Map_item}>
                                <div className={st.content_Map_item_img}>
                                    <img src={cmapPic2}></img>
                                </div>
                                <div className={st.content_Map_item_body}>
                                    <h2>服务加载</h2>
                                    <p>
                                        支持加载ArcGIS常用服务（动态、切片、要素）服务，支持OGC服务。
                                    </p>
                                </div>
                            </div>
                            <div className={st.content_Map_item}>
                                <div className={st.content_Map_item_img}>
                                    <img src={cmapPic3}></img>
                                </div>
                                <div className={st.content_Map_item_body}>
                                    <h2>符号化</h2>
                                    <p>
                                        支持加载ArcGIS常用服务（动态、切片、要素）服务，支持OGC服务。
                                    </p>
                                </div>
                            </div>
                            <div className={st.content_Map_item}>
                                <div className={st.content_Map_item_img}>
                                    <img src={cmapPic4}></img>
                                </div>
                                <div className={st.content_Map_item_body}>
                                    <h2>自定义绘制</h2>
                                    <p>
                                        支持加载ArcGIS常用服务（动态、切片、要素）服务，支持OGC服务。
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