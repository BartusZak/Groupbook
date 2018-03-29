import React, { Component } from 'react';
import './GroupLeftSideBar.css';
import FacetStock from '../../assets/img/profiles/facet.jpg';
import GroupLeftSideBarSingleItem from './GroupLeftSideBarSingleItem/GroupLeftSideBarSingleItem';


const groupLeftSideBar = (props) => (
    <div className="left-group-block">
        <p className="left-group-recent-add">
            Ostatnio dodani
        </p>
        <ul className="left-group-last-add-block">
            <GroupLeftSideBarSingleItem pic={FacetStock}/>
            <GroupLeftSideBarSingleItem pic={FacetStock}/>
            <GroupLeftSideBarSingleItem pic={FacetStock}/>
            <GroupLeftSideBarSingleItem pic={FacetStock}/>
            <GroupLeftSideBarSingleItem pic={FacetStock}/>
        </ul>
        <div className="rotate-icon-users">
            <i className="fa fa-fast-forward"></i>
            <i className="fa fa-fast-backward"></i>
        </div>
    
    </div>
);
export default groupLeftSideBar;