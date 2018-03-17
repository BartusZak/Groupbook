import React from 'react';
import './Avatar.css';
import ProfilePicture from '../../../assets/img/profiles/facet.jpg';
import {NavLink} from 'react-router-dom';

const avatar = (props) => (
    <div className="Avatar">
        <NavLink to="/logged">
            <img src={ProfilePicture} alt="Profilowe" />
        </NavLink>
       
    </div>
);

export default avatar;