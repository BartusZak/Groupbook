import React from 'react';
import { LoaderDiv } from './Loader.style';
const loader = (props) => {
    return( <LoaderDiv><div style={{width: props.width, height: props.height, top: props.top, right: props.right}} 
        className="loader"></div></LoaderDiv> );
}
export default loader;