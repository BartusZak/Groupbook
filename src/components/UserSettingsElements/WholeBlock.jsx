import React from 'react';
import './WholeBlock.css';
import Aux from '../../hoc/Auxi';
const wholeBlock = (props) => {
    let Content = null;
    switch(props.itemNumber){
        case 1:
            Content = (
                <ul className="WholeBlock">
                    {props.wholeItems.map(item => {
                    return <li key={item.id}> <b style={{fontWeight: 'initial', textAlign: 'left'}}>{item.name}</b> <b>{item + "jakies tam wartosci"}</b> <b className="Option">{item.option}</b></li>;
                    })}
                </ul>
            );
            break;
    }
    return(<Aux>{Content}</Aux>);
}
export default wholeBlock;
