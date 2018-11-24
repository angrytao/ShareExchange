import React from 'react';
import { Row, Col } from 'antd';
import st from './Home.less';

const ContentCase = (props) => {
    return(
        <div className={st.Content_Case}>
            <div className={st.content_title}>综合案例</div>
            <Row>
                <Col span={8}></Col>
                <Col span={8}></Col>
                <Col span={8}></Col>
            </Row>
            <Row>
                <Col span={8}></Col>
                <Col span={8}></Col>
                <Col span={8}></Col>
            </Row>
        </div>
    )
}

export default ContentCase;