import { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import st from './Home.less';

import DataExchange from '../DataExchange/DataExchange';
import Cartography from '../Cartography/Cartography';

class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div className={st.Home}>
        <Link to="/dataexchange">数据</Link>
        <Link to="/cartography">制图</Link>
        <Switch>
          <Route path="/home/dataexchange" component={DataExchange} />
          <Route path="/home/cartography" component={Cartography} />
        </Switch>
      </div>
    );
  }
}

export default Home;
