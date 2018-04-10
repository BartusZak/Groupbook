import React from 'react';
import {Loader} from './Spinner.style';

const spinner = (props) => (

    <Loader className={props.className} style={{marginLeft: props.margin, marginTop: props.marginTop}}></Loader>

)


export default spinner;