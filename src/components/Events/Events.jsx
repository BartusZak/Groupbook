import Aux from '../../hoc/Auxi';
import React, { Component } from 'react';
import EventsBar from './EventsBar/EventsBar';
import Button from '../../components/UI/Button';
import { connect } from 'react-redux';
import { fetchEventsActionCreator } from '../../store/Events/Actions';
import Spinner from '../UI/Spinner/Spinner';
class Events extends Component {
    state = {
        currentEvents: this.props.events,
        loadMoreSpinner: false

    }
    componentDidUpdate(prevProps){
        if(prevProps.fetchedEvents !== this.props.fetchedEvents){
            let newCurrentEvents = [...this.state.currentEvents];
            newCurrentEvents = newCurrentEvents.concat(this.props.fetchedEvents);
            
            this.setState({currentEvents: newCurrentEvents, loadMoreSpinner: false});
        }
        if(prevProps.fetchedEventsErrors !== this.props.fetchedEventsErrors){
            this.setState({loadMoreSpinner: false});
        }
    }
    generateNextEvents = () => {
        this.props.fetchEvents(this.state.currentEvents[this.state.currentEvents.length-1].id 
            ,this.props.groupId);
        this.setState({loadMoreSpinner: true});
    }
    render() { 
        return(
            <Aux> 
                <p className="event-info">Wydarzenia</p>
                

                {this.props.fetchedEventsErrors.length > 0 ?
                <p className="server-error">{this.props.fetchedEventsErrors[0]}</p> :
                this.state.currentEvents.length > 0 ? 
                
                <Aux>
                    <div className="group-main-content">
                    {this.state.loadMoreSpinner ? <div className="spinner-absolute"><Spinner /></div> : null}
                        
                        {this.state.currentEvents.map(i => {
                            return <EventsBar key={i.id}
                            title={i.title}
                            id={i.id}
                            place={i.place}
                            eventDate={i.eventDate} 
                            picture={i.picture}
                            description={i.desciption}/>
                        })}

                    </div>

                    <div className="btn-container">
                        <Button clicked={() => this.generateNextEvents()} title="Następne" color="dark-green" margin="initial auto"/>
                    </div>    
                </Aux>
                : <p className="empty-content-in-group">W tej grupie nie ma żadnych wydarzeń</p>} 
                
            </Aux>  
        );
    }
}
 

const mapStateToProps = state => {
    return {
        fetchedEvents: state.EventsReducer.fetchedEvents,
        fetchedEventsErrors: state.EventsReducer.fetchedEventsErrors
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchEvents: (lastEventId, groupId) => dispatch(fetchEventsActionCreator(lastEventId, groupId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Events);
