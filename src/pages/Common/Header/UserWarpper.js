import React,{ Component }  from 'react';

import st from './Index.less';

class UserWarpper extends Component{
    render(){
        return(
            <div className={st.top}>
                <div className={st.content}>
                    <ul style={{float:'left'}}>
                        <li>gisjxpd@jxpd.com</li>
                        <li>0573-82572077</li>
                        
                    </ul>
                    <ul style={{float:'right'}}>
                        <li>登录</li>
                        <li>注册</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserWarpper;