import React, { Component } from 'react';
import './UserSettings.css';
import WholeBlock from '../../../components/UserSettingsElements/WholeBlock';
import { connect } from 'react-redux';
import axios from 'axios/axios-groupsconnects';

class UserSettings extends Component{
    state = { 
        choosenId: 1,
        wholeItems : [],
        error: false

    }
    componentDidMount(){
        const loggingObject = (
            JSON.parse(localStorage.getItem('responseObject')) !== null ? 
            JSON.parse(localStorage.getItem('responseObject')) :
            this.props.loggingObject
        );

        if(loggingObject !== null){
            axios.get( '/api/users/' + loggingObject.id )
                .then( response => {
                    const WholeItems = [ 
                        {id: 1, name: "Imię", value: response.data.firstName},
                        {id: 2, name: "Nazwisko", value: response.data.LastName},
                        {id: 3, name: "Nazwa użytkownika", value: response.data.username},
                        {id: 4, name: "Adres email", value: response.data.email},
                        {id: 5, name: "Data urodzenia", value: response.data.birthDate},
                        {id: 6, name: "Płec", value: response.data.sex ? "Mężczyzna" : "Kobieta"}            
                    ];
                    this.setState({ wholeItems: WholeItems })
                } )
                //TODO
                //dodac obsluge blędu
                .catch( err => {
                    console.log(err);
                } );
        }
    }
    changingChoosenBlock = (id) => { this.setState({choosenId: id}); }

    render(){
        const errorContent = <p>Błąd poczas nawiązywania połączenia z serwerem</p>;

        const UserSettings = [
            {id: 1, name: "Ogólne"},
            {id: 2, name: "Bezpieczeństwo"},
            {id: 3, name: "Społeczności"}
        ];
        return (
            (this.state.error)? 
                {errorContent} 
            :
                (
                    <div className="UserSettings">
                        <div className="UserSettingsBlock">
                            <h2 style={{marginTop: '30px'}}>Opcje użytkownika</h2>
                            <ul className="NavList">
                                {UserSettings.map(item => {
                                    return <li className={item.id === this.state.choosenId ? "Active" : ""} key={item.id} onClick={() => this.changingChoosenBlock(item.id)}>{item.name}</li>
                                })}
                            </ul>
                            <WholeBlock
                            wholeItems={this.state.wholeItems}
                            itemNumber={this.state.choosenId}
                            loggingObject={this.props.loggingObject} />
                        </div>
                    </div>
                )
        );
    }
}

const mapStateToProps = state => {
    return { loggingObject: state.logRed.loggingObject };
}
export default connect(mapStateToProps, null)(UserSettings);
