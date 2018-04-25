import React, { Component } from 'react';
import {UserDetailsInfoDiv} from './UserDetailsInfo.style';
import Button from 'components/UI/Button';
import axios from 'axios/axios-groupsconnects';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import Aux from '../../../hoc/Auxi';


class UserDetailsInfo extends Component {
    state = { 
        user: this.props.user,
        loading: true,
        userObject: null,
     }
     componentWillMount(){
        //console.log(this.props);
        //console.log( JSON.parse(localStorage.getItem('responseObject')).id);
     }
    // componentDidMount(){
    //     const responseObject = JSON.parse(localStorage.getItem('responseObject')) !== null ?
    //         JSON.parse(localStorage.getItem('responseObject')) : this.props.user;
    //             this.setState({userObject: responseObject}); // nie dziala!  

    //             console.log("DidMount this.state.userObject ",this.state.userObject);
    //             console.log("localStorage ", responseObject);
    // }

    loadData () {
        if ( this.props.id) {
            if ( !this.state.user) {
                axios.get( '/api/users/' + this.props.id)
                    .then( response => {
                        // console.log(response.data);
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
        let birthDateObject = (this.state.user != null) ? new Date(this.state.user.birthDate) : new Date();
        let years = ~~((Date.now() - birthDateObject) / (31557600000))

        

        let month = birthDateObject.getUTCMonth() + 1; //months from 1-12
        let day = birthDateObject.getUTCDate();
        let year = birthDateObject.getUTCFullYear();

        let newdate = year + "/" + month + "/" + day;
        let wiek = (years >= 100)? null : <Aux><li>Wiek</li><li>{newdate} ({years} lat)</li></Aux>;
        let user = <p style={{ textAlign: 'center' }}>Brak danych :(</p>;

        let buttons = (JSON.parse(localStorage.getItem('responseObject')).id !== this.state.user.id)? <Aux><Button title="Wyślij wiadomość"/><Button title="Dodaj do grupy"/></Aux>:null;
        if ( this.props.id) {
            user = <UserDetailsInfoDiv>
                        <Spinner/>
                        <p style={{ textAlign: 'center' }}>Ładowanie...!</p>
                    </UserDetailsInfoDiv>
        }
        else if ( this.state.user ) {
            let gender = !(this.state.user.sex === true)? <p>Mężczyzna</p> : <p>Kobieta</p>;
            user = (

                <UserDetailsInfoDiv>
                        <h1><u>{this.state.user.firstName} {this.state.user.lastName}</u> ({this.state.user.username} #{this.state.user.id})</h1>
                        {buttons}
                        <ul>
                            <li>Adres e-mail</li>
                            <li><a href={"mailto:" + this.state.user.email} obfuscate="true">{this.state.user.email}</a></li>
                            <li>Płeć</li>
                            <li>{gender}</li>
                            {wiek}
                        </ul>
                </UserDetailsInfoDiv>

            );
        }
        return user;
    }
}
// const mapStateToProps = state => {
//     return {
//         user: state.logRed.loggingObject,
//     };
// }
// export default connect( mapStateToProps, null)(withRouter( withErrorHandler(UserDetailsInfo, axios)));
export default withErrorHandler(UserDetailsInfo, axios);