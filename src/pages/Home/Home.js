import React,{ Component,Fragment } from 'react';
import Header from '../Common/Header/Index';
import Banner from './Banner';
import ConentData from './ConentData';
import ContentMap from './ContentMap';
import ContentCatalog from './ContentCatalog';
import ContentCase from './ContentCase';
import Footer from './Footer';
import st from './Home.less';
import '../Iconfont/iconfont.css';


class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <Fragment>
        <Header />
        <Banner />
        <ConentData />
        <ContentMap />
        <ContentCatalog />
        <ContentCase />
        <Footer />
      </Fragment>

    );
  }
}

export default Home;
