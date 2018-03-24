import Aux from '../../hoc/Auxi';
import React from 'react';
import EventsBar from './EventsBar/EventsBar';
import Back from '../../assets/img/groupimages/back.jpg';
import Button from '../../components/UI/Button';
import PostBlock from '../PostBlock/PostBlock';
const event = (props) => {
    const Content = (
        <Aux>
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
        </Aux>     
    );
    const Result = (props.didShowEvents ? Content : <PostBlock />);
    return(
        <Aux>
            <p className="group-title-full">Niekompetetni programiści </p>
            <nav style={{backgroundImage: `url(${Back})`}} className="navigation-bar">
                <span className="group-owner">Należysz <i class="fa fa-check"></i></span>
            </nav>
            <div className="navigate">
                <div className="group-nav-left">
                    <i onClick={props.showPosts} class="fa fa-clipboard"></i>
                    <i onClick={props.showEvents} class="fa fa-calendar"></i>
                </div>
                <div className="group-nav-right">
                    <i class="fa fa-envelope"></i>
                    <i class="fa fa-user-plus"></i>
                </div>                               
            </div>
            {Result}
            
        </Aux>
       
    );
}

export default event
