import React from 'react';
import './GroupPostShortcut.css';
import FacetStock from '../../../assets/img/profiles/facet.jpg';
import GroupPostSingleItem from './GroupPostSingleItem/GroupPostSingleItem';
const groupPostShortcut = (props) => {
        return(
            <div className="left-group-block">
                <p className="left-group-recent-add">
                    Ostatnio dodani
                </p>

                
                <ul className="left-group-last-add-block">
                    <GroupPostSingleItem pic={FacetStock}/>
                    <GroupPostSingleItem pic={FacetStock}/>
                    <GroupPostSingleItem pic={FacetStock}/>
                    <GroupPostSingleItem pic={FacetStock}/>
                    <GroupPostSingleItem pic={FacetStock}/>
                </ul>
                <div className="rotate-icon-users">
                    <i class="fa fa-fast-forward"></i>
                    <i class="fa fa-fast-backward"></i>
                </div>
                
            </div>
        );
    }

export default groupPostShortcut;