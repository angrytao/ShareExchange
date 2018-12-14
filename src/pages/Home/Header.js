import React,{ Component }  from 'react';
import HeaderUser from './HeaderUser';
import HeaderNav from './HeaderNav';

class Header extends Component{
    render(){
        return(
            <div style={{width:'100%',zIndex:'999',position: 'fixed',top:'0px'}}>
                <HeaderUser
                    id="UserWarpper"
                />
                <HeaderNav
                    id="HeaderUser"
                />
            </div>
        )
    }
}

export default Header;