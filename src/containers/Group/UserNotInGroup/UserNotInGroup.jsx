import React from 'react';
import './UserNotInGroup.css';
import { Link } from 'react-router-dom';

const userNotInGroup = props => (
    <div className="user-not-in-group-container">
        <h3>Nie jesteś członkiem tej grupy!</h3>
        <p>
        Naciśnij <i onClick={props.clicked}>kliknij tutaj</i>, aby poprosić lidera o przyjęcie do grupy.
        </p>
    </div>
);

export default userNotInGroup;