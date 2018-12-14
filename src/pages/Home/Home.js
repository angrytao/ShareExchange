import React,{ Component,Fragment } from 'react';
import Header from './Header';
import Banner from './Banner';
import ContentData from './ContentData';
import ContentMap from './ContentMap';
import ContentCatalog from './ContentCatalog';
import ContentCase from './ContentCase';
import Footer from './Footer';
import { BackTop } from 'antd';
import st from './Home.less';
import '../Iconfont/iconfont.css';

class Home extends Component {

  render() {
    console.log(this.props);
    return (
      <Fragment>
        <Header />
        <Banner />
        <ContentData id="ContentData"/>
        <ContentMap id="ContentMap"/>
        <ContentCatalog id="ContentCatalog"/>
        <ContentCase id="ContentCase"/>
        <Footer />
        <BackTop />
      </Fragment>

    );
  }
}

export default Home;
