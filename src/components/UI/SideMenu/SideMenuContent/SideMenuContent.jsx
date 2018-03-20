import React from 'react';
import Aux from '../../../../hoc/Auxi';
import './SideMenuContent.css';
import Image from '../../../../assets/img/404/404.jpg';
const sideMenuContent = (props) => (
    <Aux>
        <p className="SideBarTitle">Twoje grupy <span onClick={props.clicked} className="closing-icon">></span></p>
        <div className="groups-place-holder">
            <div>
                <img src={Image} alt="Nazwa grupy" />
            </div>                
            <div>
                <img src={Image} alt="Nazwa grupy" />
            </div>
            <div>
                <img src={Image} alt="Nazwa grupy" />
            </div>
            <div>
                <img src={Image} alt="Nazwa grupy" />
            </div>
            <div>
                <img src={Image} alt="Nazwa grupy" />
            </div>                                 
        </div>
        <p className="SideBarTitle">Ostatnie wiadomości</p>
        <ul className="messages-place-holder">
            <li>ela23213</li>
            <li>s(ela19932)</li>
            <li>ela19932</li>
            <li>ELzbietxs</li>
        </ul>

        <p className="SideBarTitle">Twoje posty</p>
        <p className="SideBarTitle">Wydarzenia</p>        
    </Aux>
);
export default sideMenuContent;