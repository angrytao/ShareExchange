import React,{ Component, Fragment }  from 'react';
import { Link } from 'react-router-dom';
import st from './Header.less';

class Header extends Component{
    render(){
        return(
           <div className={st.header}>
               <div className={st.content}>
                    <ul className={st.nav}>
                        <li style={{width:'120px'}}><Link to='/'>返回首页</Link></li>
                        <li><Link to='/dataexchange'>数据分享</Link></li>
                        <li><Link to='/cartography'>地图制图</Link></li>
                        <li><Link to='/dataexchange'>服务目录</Link></li>
                        <li><Link to='/dataexchange'>综合案例</Link></li>
                    </ul>
                    <ul className={st.userWarpper}>
                        <li><Link to='/dataexchange'>登陆</Link></li>
                        <li><Link to='/dataexchange'>注册</Link></li>
                    </ul>
               </div>
           </div> 
        )

    }
}

export default Header;