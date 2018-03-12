import React from 'react';
import {Link} from 'react-router-dom';

import Aux from '../../../hoc/Auxi';
import logoImg from '../../../assets/img/logo/groupsconnectsLogoSmall.png';


const logoIcon = (props) => {
  return (
        <Aux>
            <Link to="/">
                <img  className={props.class} src={logoImg} alt="GroupsConnects icon" width={props.width}/>
            </Link>
        </Aux>
  );
}

export default logoIcon;