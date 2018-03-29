import React, { Component } from 'react';
import './EventDetails.css';
import Image from '../../assets/img/404/404.jpg';
import 'font-awesome/css/font-awesome.min.css';
import EventDetailsBlock from './EventDetailsBlock/EventDetailsBlock';
import Modal from '../UI/Modal/Modal';
import Aux from '../../hoc/Auxi';
import ConfirmModal from '../UI/ConfirmModal/ConfirmModal';
import { withRouter } from 'react-router-dom';
import OpenedMessage from '../UI/OpenedMessage/OpenedMessage';
import Calendar from '../UI/Calendar/Calendar';
const randomizeObjects = [1,2,3,4,5,6,7,8,9];



class EventDetails extends Component{
    constructor(props){
        super(props);
        this.state = { 
            openUsersModal: false,
            denyEventStateModal: false,
            width: window.innerWidth,
            eventAuthor: false,

            showCalendar: false
        }
        this.updateWindowWidth = this.updateWindowWidth.bind(this);
    }
    componentDidMount(){
        window.addEventListener('resize', this.updateWindowWidth);
    }
    componentWillUnmount(){ 
        window.removeEventListener('resize', this.updateWindowWidth);
    }
    updateWindowWidth = () => { // wysylanie danych do komponentu child 
        // tylko jak szerokosc jest wieksza od 1001 poniewaz nie ma sensu
        // wykonywac zapytania jak komponent ma wartocs display: none
        this.setState({width: window.innerWidth});
    }
    openUsersModal = () => {
        this.setState({openUsersModal: !this.state.openUsersModal});
    }
    openDenyStateModal = () => {
        this.setState({denyEventStateModal: !this.state.denyEventStateModal});
    }
    denyEventJoinByUser = () => { 
        this.props.history.push('/logged/group/poczekalnia');
    }
    openMessageToEventAuthor = () => {
        this.setState({eventAuthor: !this.state.eventAuthor});
    }
    showCalendar = () => { this.setState({showCalendar: !this.state.showCalendar })}
    render(){
        return(
            <Aux>
            <div className="left-eventdetails-container">
                <p className="event-name">
                    <span>Spotkanie z matką Teresą </span>
                    <i onClick={this.showCalendar} className="fa fa-calendar"></i> 
                   
                </p>
                <div className="events-users-number">
                    9 użytkowników bierze udział w tym wydarzeniu
                    <Calendar choosenDay={19} showCalendar={this.state.showCalendar}/> 
                </div>


                <div style={{backgroundImage: `url(${Image})`}} className="event-details-bar">
                    <span className="enjoy-event-block">
                        Bierzesz udział
                        <i className="fa fa-check"></i>
                    </span>        
                </div>
                <div className="event-author-date-container">
                    <span className="event-author">
                        piecia1994
                        <i onClick={this.openMessageToEventAuthor} className="fa fa-envelope"></i> 
                    </span>
                    <span className="event-date">19-16-2016 16:45</span>  
                </div>

                <div className="eventdetails-desc">
                    Granie w lola cala noc. Potem csy i inne takie takie. 
                    Na sam koniec wielka pizza i ruski szampon do bialego rana
                </div>
                
                <iframe className="event-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.079849572969!2d21.045057280270107!3d52.18742126867426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc9b773b2197%3A0x6338f59562daf786!2sBillennium+-+Rozwi%C4%85zania+IT+dla+biznesu!5e0!3m2!1spl!2spl!4v1522142041683"></iframe>
                
                <span onClick={this.openDenyStateModal} className="event-button">
                    Zrezygnuj                
                </span>

                <p className="event-user-bar-title">
                    <span>Wezmą udział</span>
                    <span onClick={this.openUsersModal}>Sprawdź wszystkich</span>
                </p>

                <ul className="event-user-bar-container">
                    {randomizeObjects.map(item => {
                        return <li style={{backgroundImage: `url(${Image})`}} key={item} className="event-user-bar"></li>;
                    })}
                </ul>
                <EventDetailsBlock events={this.state.width >= 1001 ? 
                randomizeObjects : null} />

        </div>
        
        <Modal clickedMethod={this.openUsersModal} show={this.state.openUsersModal} >
            <p className="users-full-list-header">Spotkanie z matka Teresą </p>
            <p className="who-created-user">stworzone przez Juras1994</p>
            <ul className="users-full-list">
                {randomizeObjects.map(item => {
                    return (<li key={item}>
                        <div className="modal-image-holder" style={{backgroundImage: `url(${Image})`}}>
                        </div>
                        <div className="modal-text-holder">
                            <p>Jaroslaw Siemaneczko</p>
                            <span>mniej niż minute temu</span>
                            <i>wyklucz z wydarzenia</i>
                        </div>
                   
                    </li>);
                })}
            </ul>
        </Modal>
        <ConfirmModal 
        isOpen={this.state.denyEventStateModal} 
        openModal={() => this.openDenyStateModal()}
        title="Czy napewno chcesz zrezygnowac z wydarzenia?"
        confirmMethod={this.denyEventJoinByUser} />

        <Modal show={this.state.eventAuthor}
        clickedMethod={this.openMessageToEventAuthor}>
            <OpenedMessage author="autor"/>
        </Modal>
    </Aux>
           
        );
    }
}
export default withRouter(EventDetails);