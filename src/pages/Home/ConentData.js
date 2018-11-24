import React  from 'react';
import { Row, Col, Button } from 'antd';
import cdPic1 from '../images/cData1.png';
import cdPic2 from '../images/cData2.png';
import cdPic3 from '../images/cData3.png';
import cdPic4 from '../images/cData4.png';
import st from './Home.less';

const ConentData = (props) =>{
    return (
        <div className={st.content_Data}>
            <div className={st.content}>
                <div className={st.content_title}>
                    数据共享交换
                </div>
                <Row>
                    <Col className={st.content_Data_item} span={6}>
                        <img src={cdPic1}></img>
                        <div className={st.content_Data_item_title}>多格式支持</div>
                        <div className={st.content_Data_item_content}>
                            支持excel、csv、txt等格式文件上传、空间化处理以及数据解析，后续将开放更多格式（例如shp格式）。
                        </div>
                    </Col>
                    <Col className={st.content_Data_item} span={6}>
                        <img src={cdPic2}></img>
                        <div className={st.content_Data_item_title}>数据编辑入库</div>
                        <div className={st.content_Data_item_content}>
                            支持对上传数据的浏览、编辑以及批量入库（需填写数据标题、名称、类别、权限等相关信息）等操作。
                        </div>
                    </Col>
                    <Col className={st.content_Data_item} span={6}>
                        <img src={cdPic3}></img>
                        <div className={st.content_Data_item_title}>统一符号化</div>
                        <div className={st.content_Data_item_content}>
                            对上传的数据进行统一的符号化，包括唯一值符号化；区间值符号化；弹出框、提示框设置等相关配置。
                        </div>
                    </Col>
                    <Col className={st.content_Data_item} span={6}>
                    <   img src={cdPic4}></img>
                        <div className={st.content_Data_item_title}>数据开放目录</div>
                        <div className={st.content_Data_item_content}>
                            分公有、私有两类数据目录，对于公有数据会面向所有用户提供下载或叠加至地图操作。
                        </div>
                    </Col>
                </Row>
                <div style={{textAlign:'center',marginTop:'30px'}}>
                    <Button type="primary" size="large">分享您的数据</Button>
                </div>
            </div>
        </div>
    )
}

export default ConentData;