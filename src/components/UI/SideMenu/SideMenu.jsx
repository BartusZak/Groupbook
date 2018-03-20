import React from 'react';
import './SideMenu.css';
const sideMenu = (props) => {
    
    return(
        <div style={{transform: props.IsDisplay ? 'translateY(0)' : 'translateY(100vh)',
                 opacity: props.IsDisplay ? '1' : '0'}} className="side-menu-container">
            {props.children}
           
        </div>
    );
}

export default sideMenu;