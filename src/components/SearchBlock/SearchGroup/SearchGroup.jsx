import React from 'react';
import './SearchGroup.css';
import Button from '../../UI/Button/Button'; 
import moment from 'moment';
const searchGroup = props => {
    const dateNow = moment().format();
    const timeFromGroupCreate = moment(props.item.creationDate.slice(0, 10)).fromNow(dateNow);
    return(
        <div className="search-group-block">
            <div className="search-group-details">
                <header>
                    <span>{props.item.name}</span>
                    <div>
                        <i className="fa fa-times"></i>
                        <i className="fa fa-users"></i>
                    </div>
                </header>
                <div style={{backgroundImage: `url(${props.item.picture ? 
                props.apiPicturesUrl + props.item.picture.fullResolutionPicName : 
                require("../../../assets/img/groupimages/back.jpg") })`}} className="search-group-pic">
                    <p>
                        <span>{props.item.creationDate.slice(0, 10)}</span>
                        <span>utworzona {timeFromGroupCreate} temu</span>
                    </p>
                    <Button clicked={props.redirectToGroup} content="Szczegóły"/>
                </div>
                <article>
                    {props.item.description}
                </article>

            </div>
            <div className="search-group-elements">

            </div>
        </div>
    );
    
};

export default searchGroup;