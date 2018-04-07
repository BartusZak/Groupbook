import React, { Component } from 'react';
import {UserDetailsInfoDiv} from './UserDetailsInfo.style';
import Button from 'components/UI/Button';
import axios from '../../../axios-users';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';



class UserDetailsInfo extends Component {
    state = { 
        user: null,
        loading: true
     }

    componentDidMount () {
        //console.log(this.props);
        this.loadData();
    }

    // componentDidUpdate() {
    //     this.loadData();
    // }

    loadData () {
        if ( this.props.id) {
            if ( !this.state.user) {
                axios.get( '/users/' + this.props.id + '.json')
                    .then( response => {
                        console.log(response.data);
                        this.setState({loading: false, user: response.data});
                    })
                    .catch(err => {
                        this.setState({loading: false});
                    });
                        // console.log(response);
            }
        }
    }

    render() {
        let user = <p style={{ textAlign: 'center' }}>Brak danych :(</p>;
        if ( this.props.id) {
            user = <UserDetailsInfoDiv>
                        <Spinner/>
                        <p style={{ textAlign: 'center' }}>Ładowanie...!</p>
                    </UserDetailsInfoDiv>
        }
        if ( this.state.user ) {
            let gender = (this.state.user.sex === true)? <p>Mężczyzna</p> : <p>Kobieta</p>;
            user = (

                <UserDetailsInfoDiv>
                        <h1><u>{this.state.user.firstName} {this.state.user.lastname}</u> ({this.state.user.username} #{this.props.id})</h1>
                        <Button title="Wyślij wiadomość"/>
                        <Button title="Dodaj do grupy"/>
                        <ul>
                            <li>Adres e-mail</li>
                            <li><a href={"mailto:" + this.state.user.email} obfuscate="true">{this.state.user.email}</a></li>
                            <li>Płeć</li>
                            <li>{gender}</li>
                            <li>Wiek</li>
                            <li>{this.state.user.birthDate}</li>
                        </ul>
                </UserDetailsInfoDiv>

            );
        }
        return user;
    }
}

export default withErrorHandler(UserDetailsInfo, axios);