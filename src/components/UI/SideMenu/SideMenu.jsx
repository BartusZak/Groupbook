import React from 'react';
import './SideMenu.css';
const sideMenu = (props) => {
    
    return(
        <div style={props.IsDisplay ? {display: "block"} : {display: "none"}} className="side-menu-container">
            <ul>
                <li>
                    Penetratorzy
                </li>
                <li>
                    Liczy rzepy kalarepy
                </li>
                <li>
                    Wojownicy krola kapcia
                </li>
            </ul>
        </div>
    );
}

export default sideMenu;