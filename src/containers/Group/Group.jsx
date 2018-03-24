import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Button from '../../components/UI/Button';
import Back from '../../assets/img/groupimages/back.jpg';
import './Group.css';
import EventsBar from '../../components/EventsBar/EventsBar';
import GroupPostShortcut from '../../components/Groups/GroupPostShortcut/GroupPostShortcut';
class Group extends Component{
    render(){
        return(
            <div className="background-container">
                
                <GroupPostShortcut />
                <div className="group-container">
                    <p className="group-title-full">Niekompetetni programiści </p>
                    <nav style={{backgroundImage: `url(${Back})`}} className="navigation-bar">
                        <span className="group-owner">Należysz <i class="fa fa-check"></i></span>
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
                        <Button title="Następne" color="dark-green" margin="initial auto"/>
                    </div>
                </div>
                
               
            </div>
            
        );
    }
}
export default Group;



