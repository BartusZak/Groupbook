import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Button from '../../components/UI/Button';
import Back from '../../assets/img/groupimages/back.jpg';
import './Group.css';
import EventsBar from '../../components/EventsBar/EventsBar';
class Group extends Component{
    render(){
        return(
            <div className="background-container">
                <div className="group-container">
                    <p className="group-title">Niekompetetni programiści</p>
                    <nav style={{backgroundImage: `url(${Back})`}} className="navigation-bar">
                    
                    </nav>
                    <div className="navigate">
                        <div className="group-nav-left">
                            <i class="fa fa-clipboard"></i>
                            <i class="fa fa-calendar"></i>
                        </div>
                        <div className="group-nav-right">
                            <i class="fa fa-envelope"></i>
                            <i class="fa fa-user-plus"></i>
                        </div>                               
                    </div>
                    <p className="event-info">Wydarzenia</p>
                    <div className="group-main-content">
                        <EventsBar />
                        <EventsBar />
                        <EventsBar />
                        <EventsBar />
                        <EventsBar />
                        <EventsBar />
                    </div>
                    <div className="btn-container">
                        <Button title="Następne" color="elegant" margin="initial auto"/>
                    </div>
                </div>
            </div>
            
        );
    }
}
export default Group;



