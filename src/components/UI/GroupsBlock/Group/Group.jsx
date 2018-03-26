import React from 'react';
import Image from '../../../../assets/img/404/404.jpg';
import { Link } from 'react-router-dom';
const group = (props) => (
    <Link to="/logged/group/1">
        <div className="group-cont">              
            <div className="image-holder">
                <img src={Image} alt="cos"/>
            </div>
            <div className="group-desc">
                <span className="group-title">Nazwa grupy</span>
                <span className="group-op">Grupa stworzona w celach humorystycznych. Tak bym powiedział. Dodatkowo lubimy szybkie samochody oraz mamy zdrowe podejscie do zycia</span>
            </div>
            <div className="group-desc-after" style={{width: props.animation ? '100%' : '0', opacity: props.animation ? '1' : '0' }}>
                <div className="group-additional-info" style={{visibility: props.animation ? 'visible' : 'hidden'}}>
                    <span><b>Data utworzenia:</b> 19-12-1994 16:45</span>
                    <span><b>jarek1994</b></span>
                </div>
            </div>
        </div>
    </Link>
    
);

export default group;