import React, { Component } from 'react';
import './SingleEvent.css';
import avocado from '../../../../assets/img/groupimages/avocado.jpg';
import Aux from '../../../../hoc/Auxi';
import { withRouter } from 'react-router-dom';
class SingleEvent extends Component{
    state = { 
        id: this.props.id
    }

    redirectToEventDetails = () => {
        if(this.state.id !== null)
            this.props.history.push("/logged/event/" + this.state.id);
    }
    render(){
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
                <span onClick={this.redirectToEventDetails} className="load-more-tag">Weż udział</span>
            </div>
       
           
       
        </Aux>
        );
    }
}



export default withRouter(SingleEvent);