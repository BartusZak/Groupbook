import React from 'react';
import {Link} from 'react-router-dom';

import Aux from '../../hoc/Auxi';
import logoImg from '../../assets/img/logo/groupsconnects.png';


const logo = (props) => {
    //let link = (props.to == null) ? "/" : props.to;
    let content = null;

    if(props.redirect){
        content =
        (   <Link to="/">
                <img  className={props.class} src={logoImg} alt="GroupsConnects logo" width={props.width}/>
            </Link>
        )
    }
    else {
        content =
        (
                <img  className={props.class} src={logoImg} alt="GroupsConnects logo" width={props.width}/>
        )
    }
  return (
        <Aux>
            {content}
        </Aux>
  );
}

export default logo;