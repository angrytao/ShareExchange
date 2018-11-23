import React  from 'react';
import st from './Index.less';

//无状态组件
const NavWarpper = (props)=> {
    return (
        <div className={st.nav}>
            <div className={st.content}>
                <a className={st.nav_logo}></a>
                <ul className={st.nav_menu}>
                    <li>数据分享</li>
                    <li>地图制图</li>
                    <li>服务目录</li>
                    <li>综合案例</li>
                </ul>
                <div className={st.clear}></div>
            </div>
        </div>
    )
}

export default NavWarpper;