import React from 'react';
import './Checkboxes/Checkboxes';
import Checkboxes from './Checkboxes/Checkboxes';
import Input from './Input/Input';
import 'font-awesome/css/font-awesome.min.css';
import {SearcherDiv} from './Searcher.style';

const searcher = (props) => {
    return(
        <SearcherDiv>
            <div className="InputContent">
                <Input />
            </div>
            <Checkboxes items={props.items}/>
        </SearcherDiv>
    );
}

export default searcher;