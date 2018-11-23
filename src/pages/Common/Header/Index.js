import React,{ Component }  from 'react';
import UserWarpper from './UserWarpper';
import NavWarpper from './NavWarpper';

class Header extends Component{
    render(){
        return(
            <div style={{width:'100%',zIndex:'999'}}>
                <UserWarpper 
                    id="UserWarpper"
                />
                <NavWarpper
                    id="NavWarpper"
                />
            </div>
        )
    }
}

export default Header;