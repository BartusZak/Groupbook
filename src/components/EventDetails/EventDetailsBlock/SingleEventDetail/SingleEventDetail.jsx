import React, { Component } from 'react';
import './SingleEventDetail.css';
import Image from '../../../../assets/img/groupimages/event1.jpg';
import 'font-awesome/css/font-awesome.min.css';
import { withRouter } from 'react-router-dom';
class SingleEventDetail extends Component{
    state = {
        eventId: this.props.id
    }
    changeEvent = () => {
        if(this.state.id !== null)
            this.props.history.push("/logged/event/" + this.state.eventId);
    }
    render(){
        return(
            <div onClick={this.changeEvent} className="single-event-detail" style={{background: `url(${Image})`}}>
        
            </div>
        );
    }
}
export default withRouter(SingleEventDetail);