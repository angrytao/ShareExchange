import { Component } from 'react';
import st from './DataExchange.less';

class Banner extends Component{
    render(){
        return(
            <div className={st.banner}>
                <div className={st.content}>
                    <h1>数据分享</h1>
                    <p>提供多格式支持、数据编辑入库、统一符号化、数据开放目录等服务</p>
                </div>
            </div>
        )
    }
}

export default Banner;