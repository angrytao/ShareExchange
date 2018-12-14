import React  from 'react';
import { Row, Col, Button } from 'antd';
import cclPic from '../images/cCatalog.png';
import st from './Home.less';

//无状态组件
const ContentCatalog = (props) =>{
    return (
        <div className={st.content_Catalog}>
            <div className={st.content}>
                <Row>
                    <Col span={12}>
                        <div className={st.content_title}>服务目录</div>
                        <div className={st.content_Catalog_desc}>根据不同的部门、企业进行分类展示，将所属单位的地图组成共享服务目录。为用户调用数据、建设系统提供数据基础。</div>
                        <div className={st.content_Catalog_itemGroup}>
                            <ul>
                                <li>
                                    <i className='iconfont'>&#xe65e;</i>
                                    <label>经济</label>
                                </li>
                                <li>
                                    <i className='iconfont'>&#xe825;</i>
                                    <label>人口</label>
                                </li>
                                <li>
                                    <i className='iconfont'>&#xe61e;</i>
                                    <label>交通</label>
                                </li>
                                <li>
                                    <i className='iconfont'>&#xe61c;</i>
                                    <label>气象</label>
                                </li>
                                <li>
                                    <i className='iconfont'>&#xe667;</i>
                                    <label>住房</label>
                                </li>
                                <li>
                                    <i className='iconfont'>&#xe636;</i>
                                    <label>医疗</label>
                                </li>
                                <li>
                                    <i className='iconfont'>&#xe65f;</i>
                                    <label>公安</label>
                                </li>
                                <li>
                                    <i className='iconfont'>&#xea63;</i>
                                    <label>教育</label>
                                </li>
                            </ul>
                        </div>
                        <div style={{textAlign:'center',marginTop:'30px'}}>
                            <Button type="primary" size="large" icon="search">浏览目录</Button>
                        </div>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={10} className={st.content_Catalog_img}>
                        <img src={cclPic}></img>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default ContentCatalog;