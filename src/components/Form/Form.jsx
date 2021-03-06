import React, {Component} from 'react';
import { MainForm, ValidationBubble } from './Form.style'
import FormItem from './FormItem/FormItem';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {fetchingLogingIn } from '../../store/actions/loggingActions';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios/axios-groupsconnects';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { validateInput } from '../../containers/UserOptions/Validation/Validation';
import OwnSpinner from '../UI/OwnSpinner/OwnSpinner';
class Form extends Component {
    state = {
        names: this.props.names, // Co ma byc wrzucone w formularz
        itemsErrors: this.props.errors,
        isError: false,
        loading: false,
        formIsValid: false,
        password: null,
        registredSuccesfully: false,
        errors: null,
        logingError: "",
        loadingSpinner: false
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.logingError !== this.props.logingError){
            this.setState({loadingSpinner: false});
        }
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.logingError !== this.props.logingError){
            this.setState({logingError: this.props.logingError});
        }
       
    }
    Validate = () => {
        const errors = [...this.state.itemsErrors];
        const oldState = [...this.state.names];
        let result = true;
        errors[0].msg = validateInput(4,25, 
            this.state.names[0].text, "", "", "", "login", "");
        errors[1].msg = validateInput(4,25, 
            this.state.names[1].text, "", "", "", "hasło", "");

        for(let key in oldState){
            if(errors[key].msg !== ""){
                result = false;
            }
            errors[key].msg = (errors[key].msg !== "") ? 
            <ValidationBubble><span>{errors[key].msg}</span></ValidationBubble>: "";
        }
        this.setState({...this.state, itemsErrors: errors, logingError: ""});

        if(result){
            this.setState({loadingSpinner: true});
            this.props.fetchingLogingIn(this.state.names[0].text,
                this.state.names[1].text, this.props.history);
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
            Username: String.prototype.trim.call(this.state.names[0].text),
            Email: String.prototype.trim.call(this.state.names[1].text),
            Password: String.prototype.trim.call(this.state.names[2].text),
            ConfirmedPassword: String.prototype.trim.call(this.state.names[3].text),
        };
        axios.post('/api/account/register', registerData)
        .then(response => {
                this.setState({loading: false});
                this.setState({registredSuccesfully: true});
            })
        .catch(error => {
                this.setState({errors: error.response.data.errors});
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
            isValid = (this.state.names[2].text == value)  && isValid;
        }
        return isValid;
    }
    onChangeHandler = (event, id) => {
        if (!event.isTrusted) return;
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

        for(let e in newItems){
            formIsValid = newItems[e].valid && formIsValid;
        }
        this.setState({names: newItems, formIsValid: formIsValid});    
    }
   
    render(){
        let text = null;
        let button = null;
        let content = <p>Tu powinien być formularz - "{this.props.name}"</p>
        let summaryErrors = (this.state.errors !== null && this.state.errors !== undefined)? this.state.errors.map(error =>{return <p key={error} className="ValidationError">{error}</p>}): null;
        if(this.props.name.toUpperCase() === "LOGOWANIE")
        {
            text = <p className="message">Nie masz konta? <Link to="/register">Utwórz konto</Link></p>;
            button = (
                <Button 
                    disabled={this.state.loadingSpinner}
                    color="dark-green"
                    type="submit"
                    clicked={this.props.isLogged ? this.props.clicked :  e => this.onSubmitHandler(e)}
                    title={this.props.buttonTitle}
                    />
            );
        }
        else if (this.props.name.toUpperCase() === "REJESTRACJA")
        {
            text = <p className="message">Masz już konto? <Link to="/logging">Zaloguj się</Link></p>;
            button = (
                <Button color="dark-green"
                    type="submit"
                    clicked={this.onRegisterHandler}
                    title={this.props.buttonTitle}
                    disabled={!this.state.formIsValid}/>

            );
        }
        if(this.state.loading){
            content = <MainForm style={{minHeight: "800px"}}><Spinner className="whiteSpinner"/></MainForm>
        }
        else if(this.state.registredSuccesfully){
            content = (
                <MainForm style={{minHeight: "800px"}}>
                    <p style={{ marginTop: "300px"}}>Użytkownik pomyślnie zarejestrowany.</p>
                    <p>Prosimy się zalogować</p>
                </MainForm>
            );
        }
        else{
            content = (
                    <MainForm>
                        <h2>{this.props.name}</h2>
                        {summaryErrors}
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
                            dropdownOptions={item.dropdownOptions}
                            />
                        })}

                        {button}
                        {text}
                        
                        <div className="const-wrapper">
                            {this.state.loadingSpinner ? 
                            <OwnSpinner /> : null}
                            
                            {this.state.logingError ?
                            <p className="loging-error">
                                {this.state.logingError}
                            </p> :
                            null
                            }
                        </div>
                        
                    </MainForm> 
                    );
        }
        
        return content;  
    }
}
const mapStateToProps = state => {
    return {
        logingError: state.logRed.logingError
    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchingLogingIn: (username, password, router) => dispatch(fetchingLogingIn(username, password, router))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Form));