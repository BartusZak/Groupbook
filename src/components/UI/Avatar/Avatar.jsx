import React from 'react';
import ProfilePicture from '../../../assets/img/profiles/facet.jpg';
import {NavLink} from 'react-router-dom';
import {AvatarDiv} from './Avatar.style';

const avatar = (props) => (
        <img className={props.class} style={props.styles} src={ProfilePicture} alt="Zdjęcie Profilowe" />
);

export default avatar;