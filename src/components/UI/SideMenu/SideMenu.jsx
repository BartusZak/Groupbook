import React from 'react';
const sideMenu = (props) => {
    
    return(
        <div style={{transform: props.IsDisplay ? 'translateY(0)' : 'translateX(100vw)',
                 opacity: props.IsDisplay ? '1' : '0'}} className="side-menu-container">
            {props.children}
           
        </div>
    );
}

export default sideMenu;