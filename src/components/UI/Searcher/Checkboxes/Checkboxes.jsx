import React from 'react';
import Checkbox from './Checkbox/Checkbox';

const checkboxes = (props) => {
    const items = props.items;

    return (
        <div className="SearcherLabels">
            {items.map(item => {
                return <Checkbox title={item} key={item}/>
            })}
        </div>
    );



}


export default checkboxes;