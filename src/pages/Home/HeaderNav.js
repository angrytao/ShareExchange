import React,{ Component }  from 'react';
import st from './Home.less';


class NavWarpper extends Component{
    constructor(props){
        super(props);
        this.handleDataClick = this.handleDataClick.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.handleCatalogClick = this.handleCatalogClick.bind(this);
        this.handleCaseClick = this.handleCaseClick.bind(this);
    }

    render(){
        return (
            <div className={st.nav}>
                <div className={st.content}>
                    <a className={st.nav_logo}></a>
                    <ul className={st.nav_menu}>
                        <li onClick={this.handleDataClick}>数据分享</li>
                        <li onClick={this.handleMapClick}>地图制图</li>
                        <li onClick={this.handleCatalogClick}>服务目录</li>
                        <li onClick={this.handleCaseClick}>综合案例</li>
                    </ul>
                    <div className={st.clear}></div>
                </div>
            </div>
        )
    }

    handleDataClick(){
        scrollAnimation(0, 480);
    }

    handleMapClick(){
        scrollAnimation(0,1130);
    }

    handleCatalogClick(){
        scrollAnimation(0,1790);
    }

    handleCaseClick(){
        scrollAnimation(0,2290);
    }
}


function scrollAnimation(currentY, targetY) {
    // 获取当前位置方法
    // const currentY = document.documentElement.scrollTop || document.body.scrollTop
  
    // 计算需要移动的距离
    let needScrollTop = targetY - currentY
    let _currentY = currentY
    setTimeout(() => {
      // 一次调用滑动帧数，每次调用会不一样
      const dist = Math.ceil(needScrollTop / 10)
      _currentY += dist
      window.scrollTo(_currentY, currentY)
      // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
      if (needScrollTop > 10 || needScrollTop < -10) {
        scrollAnimation(_currentY, targetY)
      } else {
        window.scrollTo(_currentY, targetY)
      }
    }, 10)
  }


export default NavWarpper;