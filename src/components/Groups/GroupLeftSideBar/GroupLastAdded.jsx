import React from 'react';
import './GroupLastAdded.css';
import FacetStock from '../../../assets/img/profiles/facet.jpg';
import GroupSingleLastAdded from './GroupPostSingleItem/GroupSingleLastAdded';
const groupSingleLastAdded = (props) => {
        return(
            <div className="left-group-block">
                <p className="left-group-recent-add">
                    Ostatnio dodani
                </p>
                <ul className="left-group-last-add-block">
                    <GroupSingleLastAdded pic={FacetStock}/>
                    <GroupSingleLastAdded pic={FacetStock}/>
                    <GroupSingleLastAdded pic={FacetStock}/>
                    <GroupSingleLastAdded pic={FacetStock}/>
                    <GroupSingleLastAdded pic={FacetStock}/>
                </ul>
                <div className="rotate-icon-users">
                    <i class="fa fa-fast-forward"></i>
                    <i class="fa fa-fast-backward"></i>
                </div>
                
            </div>
        );
    }

export default groupSingleLastAdded;