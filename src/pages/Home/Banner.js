import React,{ Fragment }  from 'react';
import st from './Home.less';

const Banner = (props)=> {
    return(
        <Fragment>
            <div className={st.banner}>
                <div className={st.content}>
                    <div className={st.banner_warp}>
                        <div className={st.banner_logo}></div>
                        <div className={st.banner_title}>兼顾多部门用户的“个性化”需求，专注于以最便捷的方式，实现部门间空间信息的流转，提供最合适的地图表达效果。</div>
                    </div>
                </div>
            </div>
            <div className={st.short_title}>
                "给时空以数据，而不是给数据以时空"
            </div>
        </Fragment>

    )
}

export default Banner;