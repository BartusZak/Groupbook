import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './OptionBlock.css';
const optionBlock = (props) => (
    <div className="OptionBlock">
            <h5>{props.title}</h5>
            <div>
                <i className={props.icon}></i>
                <div className="Informations">
                    <p>{props.function}</p>
                    <b style={{fontWeight: 'initial'}}>{props.shortContent}</b>
            </div>
        </div>  
    </div>
);
export default optionBlock;