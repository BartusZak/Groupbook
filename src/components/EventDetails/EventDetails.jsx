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
import { connect } from 'react-redux';
import { fetchOneEventActionCreator,
    addUserToEventActionCreator, redirectToOtherEventActionCreator,
    rejectFromEventActionCreator, deleteEventActionCreator } from '../../store/Events/Actions';
import { concatingUrl } from '../../helperMethods/concatingUrl';
import { apiPicturesUrl } from '../../axios/apiPicturesUrl';
import AvatarMan from '../../assets/img/empty_avatars/empty_avatar_man.jpg';
import AvatarGirl from '../../assets/img/empty_avatars/empty-avatar-girl.jpg';
import moment from 'moment';
import Button from '../UI/Button/Button';
import Backdrop from '../UI/Backdrop/Backdrop';
import Spinner from '../UI/Spinner/Spinner';
import Prompt from '../UI/Prompt/Prompt';
import ConfrimPrompt from '../../components/UI/ConfirmPrompt/ConfirmPrompt';
import MapComponent from '../MapComponent/MapComponent';


class EventDetails extends Component{
    constructor(props){
        super(props);
        this.state = { 
            openUsersModal: false,
            denyEventStateModal: false,
            width: window.innerWidth,
            eventAuthor: false,

            loadEventSpinner: true,

            showCalendar: false,
            addUserToEventSpinner: false,
            addUserToEventSuccMessage: null,

            rejectEventSpinner: false, 
            rejectEventPrompt: null,

            deletingEventSpinner: false,
            deletingEventPrompt: null,

            confirmModalOpen: false,
            lat: null,
            lng: null,
            address: null
        }
        this.updateWindowWidth = this.updateWindowWidth.bind(this);
    }
    cutTheNeededPlaceData = place => {
        const array = [];
        const indexOfCords = place.indexOf("[")
        let newAddress = "";
        for(let i = 0; i < indexOfCords; i++)
            newAddress += place.charAt(i);
        
        let letAndLng = "";
        for(let i = indexOfCords; i < place.length; i++)
            letAndLng += place.charAt(i); 
        
        const spaceIndex = letAndLng.indexOf(" ");
        let value = "";
        for(let i = 1; i < spaceIndex; i++)
            value += letAndLng.charAt(i);

        array.push(Number(value));
        value = "";

        for(let i = spaceIndex; i < letAndLng.length-1; i++)
            value += letAndLng.charAt(i);

        array.push(Number(value));

        this.setState({address: newAddress, lat: array[0], lng: array[1]});  
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.addUserToEventErrorList !== this.props.addUserToEventErrorList){
            this.setState({addUserToEventSpinner: false, addUserToEventSuccMessage: true});

            setTimeout( () => {
                this.setState({addUserToEventSuccMessage: null});
            }, 3000);
        }
        if(nextProps.fetchedOneEvent !== this.props.fetchedOneEvent){
            this.setState({loadEventSpinner: false});

            if(nextProps.fetchedOneEvent.place)
                this.cutTheNeededPlaceData(nextProps.fetchedOneEvent.place);
        }
        if(nextProps.rejectErrors !== this.props.rejectErrors){
            this.setState({rejectEventSpinner: false, rejectEventPrompt: true});
            setTimeout(() => {
                this.setState({rejectEventPrompt: false});
            }, 3000);
        }
        if(nextProps.deleteEventErrors !== this.props.deleteEventErrors){
            this.setState({deletingEventSpinner: false, deletingEventPrompt: true, confirmModalOpen: false});
            setTimeout(() => {
                this.setState({deletingEventPrompt: false});
            }, 3000);
            if(nextProps.deleteEventErrors){
                setTimeout(() => {
                    this.props.history.push("/logged/group/2");
                }, 4500);
            }
        }
        
    }
    componentDidMount(){
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.fetchOneEvent(concatingUrl(this.props.history.location.pathname),
            responseObject["token"]);
            
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

    searchEventLider = () => {
        if(this.props.fetchedOneEvent.eventUsers){
            for(let key in this.props.fetchedOneEvent.eventUsers){
                if(this.props.fetchedOneEvent.eventUsers[key].isInitiator){
                    return this.props.fetchedOneEvent.eventUsers[key].user.username;
                }
            }
        }
    }

    isUserExistInEvent = () => {
        if(this.props.fetchedOneEvent.eventUsers){
            const fetchedUsersCopy = [...this.props.fetchedOneEvent.eventUsers];
            const responseObject = JSON.parse(localStorage.getItem('responseObject'));
            for(let key in fetchedUsersCopy){
                if(fetchedUsersCopy[key].user.username === responseObject.username){
                    return true;
                }
            }
        }
        return false;
    }

    isUserLider = () => {
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        if(responseObject.username === this.searchEventLider()){
            return true;
        }
        return false;
    }

    addUserToEvent = () => {
        this.setState({addUserToEventSpinner: true});
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.addUserToEvent(this.props.fetchedOneEvent.id, responseObject.id);
    }
    redirectToOtherEvent = e => {
        this.props.redirectToOtherEvent(
            e.target.id, this.props.history);
    }
    rejectFromEventHandler = () => {
        this.setState({rejectEventSpinner: true});
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.rejectFromEvent(responseObject.token, this.props.fetchedOneEvent.id);
    }

    deleteEventHandler = () => {
        this.setState({deletingEventSpinner: true});
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.deleteEvent(responseObject.token, 
            this.props.fetchedOneEvent.id);
    }
    
    render(){
        const date = moment().format();
        const eventLider = this.searchEventLider();
        const isUserInEvent = this.isUserExistInEvent();
        const isUserLider = this.isUserLider();
        return(
        <Aux>
            <Backdrop show={this.state.addUserToEventSpinner}>
                <Spinner />
            </Backdrop>
            <Backdrop show={this.state.rejectEventSpinner}>
                <Spinner />
            </Backdrop>
            <Backdrop show={this.state.deletingEventSpinner}>
                <Spinner />
            </Backdrop>
            <ConfrimPrompt show={this.state.confirmModalOpen} 
            close={() => this.setState({confirmModalOpen: false})}
            message={` Pamiętaj, że ta operacja jest nie odwracalna. Czy jesteś pewny, że chcesz usunąć wydarzenie 
            ${this.props.fetchedOneEvent.title} ?` }
            action={this.deleteEventHandler}
            btnName="Usuń wydarzenie" />



        {this.state.loadEventSpinner ? 
        <Backdrop show={this.state.loadEventSpinner}>
            <Spinner />
        </Backdrop> : 
         <div className="left-eventdetails-container">

         {this.state.addUserToEventSuccMessage === null ? null :
         this.props.addUserToEventResult === true ? 
         <Prompt on={this.state.addUserToEventSuccMessage} 
         message="Udało się pomyślnie dołączyć do wydarzenia" 
         promptClass="prompt-ok"/> 

         : <Prompt promptClass="prompt-bad" on={this.state.addUserToEventSuccMessage}
         message={this.props.addUserToEventErrorList[0]} />}


        {this.state.rejectEventPrompt === null ? null :
         this.props.rejectResult === true ? 
         <Prompt on={this.state.rejectEventPrompt} 
         message="Zrezygnowałeś z wydarzenia" 
         promptClass="prompt-ok"/> 

         : <Prompt promptClass="prompt-bad" on={this.state.rejectEventPrompt}
         message={this.props.rejectErrors[0]} />}


        {this.state.deletingEventPrompt === null ? null :
         this.props.deleteEventResult === true ? 
         <Prompt on={this.state.deletingEventPrompt} 
         message="Pomyślnie usunieto wydarzenie, zostaniesz przekierowany..." 
         promptClass="prompt-ok"/> 

         : <Prompt promptClass="prompt-bad" on={this.state.deletingEventPrompt}
         message={this.props.deleteEventErrors[0]} />}

        
        


        <p className="event-name">
             <span>{this.props.fetchedOneEvent.title}</span>
             <i onClick={this.showCalendar} className="fa fa-calendar"></i> 
            
         </p>
         <div className="events-users-number">
             {this.props.fetchedOneEvent.eventUsers ? 
             this.props.fetchedOneEvent.eventUsers.length : null} {this.props.fetchedOneEvent.eventUsers ? 
             this.props.fetchedOneEvent.eventUsers.length > 1 ? "użytkowników" : "użytkownik" : null} bierze udział w tym wydarzeniu
             <Calendar choosenDay={
                 Number(this.props.fetchedOneEvent.eventDate.slice(5,7))
             } showCalendar={this.state.showCalendar}/> 
         </div>

         <div style={{backgroundImage: `url(${this.props.fetchedOneEvent.picture ? 
         apiPicturesUrl + this.props.fetchedOneEvent.picture.fullResolutionPicName : Image })`}} className="event-details-bar">
             <span className="enjoy-event-block">
                 {isUserInEvent ? "Bierzesz udział" : "Nie bierzesz udziału"}
                 <i className="fa fa-check"></i>
             </span>        
         </div>
         <div className="event-author-date-container">
             <span className="event-author">
                 {eventLider}
                 <i onClick={this.openMessageToEventAuthor} className="fa fa-envelope"></i> 
             </span>
             <span className="event-date">{this.props.fetchedOneEvent.eventDate ? 
             this.props.fetchedOneEvent.eventDate.slice(0,10) : null}</span>  
         </div>

         <div className="eventdetails-desc">
             <h4>Opis wydarzenia</h4>
             {this.props.fetchedOneEvent.description}
         </div>
         
        {this.props.fetchedOneEvent.place ? 
        <div className="event-map">
            <MapComponent 
            lat={this.state.lat}
            lng={this.state.lng} />
            <h5>{this.state.address}</h5>
        </div> : null}


         
         
         {!isUserInEvent ? 
         <Button clicked={this.addUserToEvent} btnClass="join-event" content="Dołącz" /> :

         isUserLider ? 
             <Button clicked={() => this.setState({confirmModalOpen: true})}
             btnClass="delete-event" content="Usuń wydarzenie" /> : 
             <Button clicked={this.rejectFromEventHandler} content="Zrezygnuj" btnClass="leave-group"/> 
         }

         
         
       

            <p className="event-user-bar-title">
                <span>Wezmą udział</span>
                <span onClick={this.openUsersModal}>Sprawdź wszystkich</span>
            </p>

            <div className="event-user-bar-container">
                {this.props.fetchedOneEvent.eventUsers ? this.props.fetchedOneEvent.eventUsers.map(item => {
                    return <img onError={(e)=>{e.target.src=require('assets/img/404/error-image-generic.png')}}
                    src={item.user.profilePicture ? 
                    apiPicturesUrl + item.user.profilePicture.avatar :
                    item.user.sex ? AvatarMan : AvatarGirl} key={item} className="event-user-bar"/>;
                }) : null}
            </div>
            <EventDetailsBlock events={this.state.width >= 1001 ? 
            this.props.groupEvents : null} 
            click={e => this.redirectToOtherEvent(e)} 
            errors={this.props.groupEventsErrors}
           />
            </div>
        
            }
           
        
        <Modal clickedMethod={this.openUsersModal} show={this.state.openUsersModal} >
            <p className="users-full-list-header">{this.props.fetchedOneEvent.title} </p>
            <p className="who-created-user">stworzone przez {eventLider}</p>
            <ul className="users-full-list">
                {this.props.fetchedOneEvent.eventUsers ? this.props.fetchedOneEvent.eventUsers.map(item => {
                    return (<li key={item}>
                        <div className="modal-image-holder" 
                        style={{backgroundImage: `url(${item.user.profilePicture ? 
                            apiPicturesUrl + item.user.profilePicture.avatar :
                            item.user.sex ? AvatarMan : AvatarGirl})`}}>
                        </div>
                        <div className="modal-text-holder">
                            <p>{item.user.username}</p>
                            <span>mniej niż minute temu</span>
                            {isUserLider ? item.user.username !== eventLider ?
                            <i>wyklucz z wydarzenia</i> : null : null}
                            
                        </div>
                   
                    </li>);
                }) : null}
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

const mapStateToProps = state => {
    return {
        fetchedOneEvent: state.EventsReducer.fetchedOneEvent,
        fetchedOneEventErrors: state.EventsReducer.fetchedOneEventErrors,

        groupEvents: state.EventsReducer.groupEvents,
        groupEventsErrors: state.EventsReducer.groupEventsErrors,

        addUserToEventResult: state.EventsReducer.addUserToEventResult,
        addUserToEventErrorList: state.EventsReducer.addUserToEventErrorList,

        rejectResult: state.EventsReducer.rejectResult,
        rejectErrors: state.EventsReducer.rejectErrors,

        deleteEventResult: state.EventsReducer.deleteEventResult,
        deleteEventErrors: state.EventsReducer.deleteEventErrors
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOneEvent: (eventId, token) => dispatch(fetchOneEventActionCreator(eventId, token)),
        addUserToEvent: (EventId, UserId) => dispatch(addUserToEventActionCreator(EventId, UserId)),
        redirectToOtherEvent: (EventId, history) => dispatch(redirectToOtherEventActionCreator(EventId, history)),
        rejectFromEvent: (token, eventId) => dispatch(rejectFromEventActionCreator(token, eventId)),
        deleteEvent: (token, eventId) => dispatch(deleteEventActionCreator(token, eventId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventDetails));
