import React from 'react';
import './Items.css';
import SingleItem from './SingleItem/SingleItem';
import Aux from 'hoc/Auxi';

const items = (props) => {
    const ItemsToMap = props.items;
   
    return(
        <Aux>
            {ItemsToMap.map(item => {
                return <SingleItem key={item.id} name={item.name} url={item.url} />
            })}
        </Aux>
    );
}

export default items;