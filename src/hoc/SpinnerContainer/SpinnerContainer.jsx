import React from 'react';
import { SpinnerDiv } from './SpinnerContainer.style';

const spinnerContainer = (props) => {
    return (
        <SpinnerDiv>
            {props.children}
        </SpinnerDiv>
    );
}

export default spinnerContainer;