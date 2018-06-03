import React, { Component } from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import './GoogleMapModal.css';
import Transition from 'react-transition-group/Transition';
import LocationPicker from 'react-location-picker';
import GoogleMapReact from 'google-map-react';

const defaultPosition = {
    lat: 52.2253,
    lng: 21.0101
  };

class GoogleMap extends Component {
    state = {
        address: null,
        position: {
            lat: 0,
            lng: 0
        }
    }
   
    handleLocationChange = ({ position, address }) => {
        this.setState({ position, address });
    }
    
    render() {
        return ( 
           
                <Transition 
                mountOnEnter 
                unmountOnExit 
                in={this.props.show}
                timeout={1000}>
                    {state => (
                        <Backdrop show={this.props.show}>
                            <div className={`google-map-modal ${this.props.show ? 
                            "google-map-modal-in" : "google-map-modal-out"}`}>
                                <h3>Wybierz lokalizację wydarzenia (opcjonalne)</h3>
                                <h5>{this.state.address ? 
                                <span>Wybrano: 
                                    <b> {this.state.address}</b>
                                </span> : <b>Nie wybrano lokalizacji</b>}
                                </h5>
                                <div>
                                    <LocationPicker
                                    containerElement={ <div style={ {height: '100%'} } /> }
                                    mapElement={ <div style={ {height: '450px'} } /> }
                                    defaultPosition={defaultPosition}
                                    onChange={this.handleLocationChange}
                                    />
                                </div>
                                <div className="google-buttons-container">
                                    <button disabled={this.state.address ? false : true}
                                    className={this.state.address ? "accept-google-btn" : "google-btn-dis"}
                                    onClick={() => this.props.acceptLocation(this.state.address, 
                                        this.state.position)}>Zatwierdź</button>
                                    <button onClick={this.props.toggle}>Anuluj</button>
                                </div>
                                
                            </div> 
                        </Backdrop>
                    )}
            </Transition>
        )
    }
}
 
export default GoogleMap;