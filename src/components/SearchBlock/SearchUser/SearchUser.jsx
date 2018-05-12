import React from 'react';
import './SearchUser.css';
import Button from '../../UI/Button/Button'; 

const searchUser = props => (
    <div className="search-result">
        <div className="search-user-block"> 
            <i className="fa fa-user"></i>
            <div style={{backgroundImage: `url(${
                props.picture ? props.apiPicturesUrl + props.picture.profile : props.sex ? 
                props.Woman : props.Man
            })`}} className="search-user-avatar">
            </div>
            <h3>{(props.firstName || props.lastName) ? props.firstName + " " + 
            props.lastName : "Nie określono"}</h3>
            <h5></h5>
            <p className="search-user-info">
                <span>Nick: </span>
                <b>{props.username}</b>
            </p>
            <p className="search-user-info">
                <span>Email: </span>
                <b>{props.email ? props.email : "Nie podano"}</b>
            </p>
            <p className="search-user-info">
                <span>Płeć: </span>
                <b>{
                    props.sex === null ? null : 
                    props.sex === true ? "Kobieta" : "Mężczyzna"}
                </b>
            </p>
            <p className="search-user-info">
                <span>Data urodzenia: </span>
                <b>{props.birthDate ? props.birthDate.slice(0, 10) : "Nie podano"}</b>
            </p>
                <Button 
                clicked={props.redirectTo}
                content={<i className="fa fa-info"></i> }
                btnClass="desc-button"/>
        </div>
    </div>
);

export default searchUser;