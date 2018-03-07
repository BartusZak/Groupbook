import React from 'react';
import './Checkboxes/Checkboxes';
import './Searcher.css';
import Checkboxes from './Checkboxes/Checkboxes';
import NavbarButton from '../NavbarButton/NavbarButton';
import Input from './Input/Input';
import 'font-awesome/css/font-awesome.min.css';

const searcher = (props) => {
    return(
        <div className="Searcher">
            <Checkboxes items={props.items}/>
            <div className="ForJustifyContent">
                <Input />
            </div>
            
           
        </div>
    );
}

export default searcher;