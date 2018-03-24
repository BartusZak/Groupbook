import React from 'react';
import './SingleEvent.css';
import avocado from '../../../assets/img/groupimages/avocado.jpg';
import Aux from '../../../hoc/Auxi';
const singleEvent = (props) => {
    return(
        <Aux>
            <div className="single-event">
                <div className="single-image-placeholder">
                    <img src={avocado} alt="" />
                         
                </div>
                <div className="event-desc-holder">
                    <span className="event-status">
                        Nowe
                    </span>
                    <div className="event-true-content">
                        Spotkanie towarzysko rekreacyjne. O Penetratorzed    Spotkanie towarzysko rekreacyjne. O Penetratorzed    Spotkanie towarzysko rekreacyjne. O Penetratorzed    Spotkanie towarzysko rekreacyjne. O Penetratorzed
                    </div>
                </div>
                
            </div>
            <div className="date-tag-holder">
                <span className="event-date">
                    Pażdziernik 2017 16:56
                </span>  
                <span className="load-more-tag">Załaduj więcej</span>
            </div>
       
           
       
        </Aux>
        
    );
}

export default singleEvent;