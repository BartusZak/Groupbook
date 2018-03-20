import React from 'react';
import {Link} from 'react-router-dom';

import Aux from '../../hoc/Auxi';
import logoImg from '../../assets/img/logo/groupsconnects.png';


const logo = (props) => {
    let link = (props.to == null) ? "/" : props.to;
    
  return (
        <Aux>
            <Link className={props.anchorClass} to={link}>
                <img  className={props.class} src={logoImg} alt="GroupsConnects logo" width={props.width}/>
            </Link>
        </Aux>
  );
}

export default logo;