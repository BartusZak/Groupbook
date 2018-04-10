import React, {Component} from 'react';
import { MainForm, ValidationBubble } from './Form.style'
import FormItem from './FormItem/FormItem';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {fetchingLogingIn } from '../../store/actions/loggingActions';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';


class Form extends Component {
    state = {
        names: this.props.names, // Co ma byc wrzucone w formularz
        itemsErrors: this.props.errors,
        isError: false,
        loading: false,
        formIsValid: false,
        password: null,
    }
    Validate = () => {
        const errors = [...this.state.itemsErrors];
        const oldState = [...this.state.names];
        let result = true;
        for(let key in oldState){
            errors[key].msg = "";
            if(oldState[key].text.length < oldState[key].min){
                errors[key].msg = "Pole " + oldState[key].name + " musi zawierać minimalnie " + oldState[key].min + " znaków";
                errors[key].isError = true;
                result = false;
            }
            if(oldState[key].text.length > oldState[key].max){
                errors[key].msg = "Pole " + oldState[key].name + "</b> może zawierać maksymalnie " + oldState[key].max + " znaków";  
                errors[key].isError = true;
                result = false;
            }
            errors[key].msg = (errors[key].msg !== "") ? <ValidationBubble><span>{errors[key].msg}</span></ValidationBubble>: "";
        }
        this.setState({...this.state, itemsErrors: errors});

        if(result){
            this.props.fetchingLogingIn(this.state.names[0].text,
                this.state.names[1].text,this.props.history);
           
        }
    }
   
    onSubmitHandler = e => { 
        e.preventDefault();
        this.Validate();
    }

    onRegisterHandler= (event) => {
        event.preventDefault();
        this.setState({loading: true});
        let registerData = {
            Username: this.state.names[0].text,
            Email: this.state.names[1].text,
            Password: this.state.names[2].text,
            ConfirmedPassword: this.state.names[3].text,
            
        };
        console.log(registerData);
        //axios.post('https://react-groupsconnects.firebaseio.com/users.json', registerData)
        axios.post('https://groupsconnectsapi.azurewebsites.net/api/account/register', registerData)
        .then(response => {
                console.log(response)
                this.setState({loading: false});
            })
        .catch(error => {
                console.log(error);
                this.setState({loading: false});
            })
    }

    checkRegisterValidity(value, rules) {
        let isValid = true;
        if(!rules){
            return true;
        }
        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.min){
            isValid = value.length >=  rules.min  && isValid;
        }

        if (rules.max){
            isValid = value.length <=  rules.max  && isValid;
        }

        if (rules.email){
            isValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)  && isValid;
        }

        if(rules.passwordConfirmation){
            isValid = (this.state.names[2].text == value)  && isValid
            console.log(isValid);
        }

        return isValid;
    }
    onChangeHandler = (event, id) => {
        const index = this.state.names.findIndex(p => {
            return p.id === id;
        });
        const item = {
            ...this.state.names[index]
        }
        item.text = event.target.value;
        if(item.validation){
            item.valid = this.checkRegisterValidity(item.text, item.validation);
        }
        
        item.touched = true;
        const newItems = [...this.state.names];
        newItems[index] = item; 

        let formIsValid = true;

        for ( let e in newItems){
            formIsValid = newItems[e].valid && formIsValid;
        }
        this.setState({names: newItems, formIsValid: formIsValid});    
    }
   
    render(){
        let text = null;
        let button = null;
        let content = <p>Tu powinien być formularz - "{this.props.name}"</p>
        if(this.props.name.toUpperCase() === "LOGOWANIE")
        {
            text = <p className="message">Nie masz konta? <Link to="/register">Utwórz konto</Link></p>;
            button = (
                <Button color="dark-green"
                    clicked={this.props.isLogged ? this.props.clicked :  e => this.onSubmitHandler(e)}
                    title={this.props.buttonTitle}
                    url={this.props.isLogged ? "/logged" : undefined}/>

            );
        }
        else if (this.props.name.toUpperCase() === "REJESTRACJA")
        {
            text = <p className="message">Masz już konto? <Link to="/logging">Zaloguj się</Link></p>;
            button = (
                <Button color="dark-green"
                    clicked={this.onRegisterHandler}
                    title={this.props.buttonTitle}
                    disabled={!this.state.formIsValid}/>

            );
        }
        if(this.state.loading){
            content = <MainForm><Spinner className="whiteSpinner"/></MainForm>
        }
        
        else{
            content = (
                    <MainForm autoComplete="off">
                    {console.log()}
                        <h2>{this.props.name}</h2>
                        {this.state.names.map(item => {
                            return <FormItem
                            key={item.id}
                            name={item.name}
                            placeholder={item.placeholder}
                            max={(item.validation)?item.validation.max:item.max}
                            min={(item.validation)?item.validation.min:item.min}
                            change={(event) => this.onChangeHandler(event, item.id)}
                            text={item.text}
                            invalid={!item.valid}
                            shouldValidate={item.validation}
                            touched={item.touched}
                            error={(item.validation)?item.validation.emailError:null}
                            errorConfirmationPassword={(item.validation)?item.validation.confirmedPasswordError:null}
                            errorMessage={this.state.itemsErrors[item.id-1].msg}
                            type={item.type}
                            />
                        })}
                        {button}
                        {text}
                    </MainForm> 
                    );
        }
        
        return content;  
    }
}
const mapStateToProps = state => {
    return {
        token: state.logRed.token,
        logingError: state.logRed.logingError,
        loggingObject: state.logRed.loggingObject
    };
}
const mapDispatchToProps = dispatch => {
    return {
        
        fetchingLogingIn: (username, password, router) => dispatch(fetchingLogingIn(username, password, router))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));