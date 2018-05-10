import React, {Component} from 'react';
import Aux from 'hoc/Auxi';
import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actionCreators from 'store/actions/changePassword';
//import PropTypes from 'prop-types';

class changePassword extends Component{
    constructor() {
        super();
        this.state = {
            loading: false,
            oldPassword: null,
            newPassword: null,
            repeatedNewPassword: null,
            formValid: false,
            errors: []
        };

        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    checkValidity(){
        let errorsTmp = []
        let valid = true;

        if(this.state.newPassword !== this.state.repeatedNewPassword){
            errorsTmp.push("Hasła nie pasują do siebie.");
            valid = false;
        }
        if(this.state.oldPassword === null || this.state.newPassword === null || this.state.repeatedNewPassword === null){
            errorsTmp.push("Żadne pole nie może być puste.");
            valid = false;
        }
        if(this.state.oldPassword.length < 5 || this.state.newPassword.length < 5 || this.state.repeatedNewPassword.length < 5){
            errorsTmp.push("Nowe hasło powinno mieć od 5 do 30 znaków.");
            valid = false;
        }

        this.setState({errors: errorsTmp});

        return valid;
    }


    changePasswordHandler = ( event ) => {
        event.preventDefault();
        this.setState( { loading: true})
        
        let validation = this.checkValidity();

        if(validation){
            this.props.changePassword(JSON.parse(localStorage.getItem('responseObject')).token, 
                                        this.state.oldPassword, this.state.newPassword, this.state.repeatedNewPassword);
        }
       
        this.setState( { loading: false, formValid: validation } );
        
    }

    inputChangeHandler({target}){
        this.setState({[target.name]: target.value});
    }

    render(){
        console.log(this.props)
        let content;
       console.log(this.state.errors);
        let errors = (this.state.errors !== null && this.state.errors.length > 0 )?( 
            <ul>
                {this.state.errors.map(item => {
                    return(
                        <li style={{color: 'red', fontWeight: 'bold'}} key={item}>{item}</li>
                    )
                })}
            </ul>
        ):
        null; 
        
        let apiErrors = (this.props.errors !== null && this.props.errors.length > 0  )?( 
            <ul>
                {this.props.errors.map(item => {
                    return(
                        (item !== undefined)? (<li style={{color: 'red', fontWeight: 'bold'}} key={item}>{item}</li>) : null
                    )
                })}
            </ul>
        ):
        null;      

        content = (
            <Aux>
                <h2>Zmień hasło</h2>
                <hr/>
                {errors}
                {apiErrors}
                <form style={{width: '90%'}} onSubmit={this.changePasswordHandler}>
                    <ul style={{margin: '0px', padding: '0px'}}>
                        <li>
                            <b>Stare hasło:</b>
                            <input type="password" name="oldPassword" onChange={this.inputChangeHandler}/>
                        </li>
                        <li>
                            <b>Nowe hasło:</b>
                            <input type="password" name="newPassword" onChange={this.inputChangeHandler}/>
                        </li>
                        <li>
                            <b>Powtórz hasło:</b>
                            <input type="password" name="repeatedNewPassword" onChange={this.inputChangeHandler}/>
                        </li>
                    </ul>
                    <Button type="submit" title="Zmień hasło"/>
                </form>
            </Aux>
        );
        if(this.props.response !== null){
            if(!this.props.response.isError){
                content = <p style={{color: 'red', fontWeight: 'bold'}}>Hasło zostało zmienione!</p>;
            }
        }
        

        if(this.state.loading){
            content = <Spinner/>;
        }

        return(
            <Aux>
                {content}
            </Aux>
        )
    }
}

// changePassword.prototype = {
//     //changePassword: PropTypes.func.isRequired
// };

const mapStateToProps = state => ({
    response: state.changePassword.response,
    errors: state.changePassword.errors
});

export default connect (mapStateToProps, actionCreators)(changePassword);