import React,{ Component }  from 'react';
import st from './Index.less';

class UserWarpper extends Component{
    render(){
        return(
            <div className={st.top}>
                <div className={st.content}>
                    <ul style={{float:'left'}}>
                        <li><i className='iconfont'>&#xe7e3;</i>Gisjxpd@jxpd.com</li>
                        <li><i className='iconfont'>&#xe61a;</i>0573-82572077</li>
                        
                    </ul>
                    <ul style={{float:'right'}}>
                        <li><i className='iconfont'>&#xe710;</i>登录</li>
                        <li><i className='iconfont'>&#xe60f;</i>注册</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserWarpper;