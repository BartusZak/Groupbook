import React from 'react';
import './Items.css';
import SingleItem from './SingleItem/SingleItem';

const items = (props) => {
    const ItemsToMap = props.items;
   
    return(
        <ul className="Items">
            {ItemsToMap.map(item => {
                return <SingleItem key={item.id} name={item.name} url={item.url} changeNothing={props.changeNothing}/>
            })}
        </ul>
    );
}

export default items;