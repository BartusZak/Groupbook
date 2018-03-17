import React, {Component} from 'react';
import { MainForm, ValidationBubble } from './Form.style'
import FormItem from './FormItem/FormItem';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';



class Form extends Component {
    state = {
        names: this.props.names, // Co ma byc wrzucone w formularz
        itemsErrors: this.props.errors, // Dostepne errory
        validated: false         // Stan walidacji
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
        this.setState({...this.state, itemsErrors: errors, validated: result});
       
    }
    onSubmitHandler = e => { 
        e.preventDefault();
        this.Validate();
    }
    //
    onChangeHandler = (event, id) => {
        const index = this.state.names.findIndex(p => {
            return p.id === id;
        });
        const item = {
            ...this.state.names[index]
        }
        item.text = event.target.value;
        const newItems = [...this.state.names];

        newItems[index] = item; 
        this.setState({names: newItems});    
    }

    render(){
        let text = null;

        if(this.props.name.toUpperCase() === "LOGOWANIE")
        {
            text = <p className='message'>Nie masz konta? <Link to='/register'>Utwórz konto</Link></p>;
        }
        else if (this.props.name.toUpperCase() === "REJESTRACJA")
        {
            text = <p className='message'>Masz już konto? <Link to='/logging'>Zaloguj się</Link></p>;
        }
        return ( 
            <MainForm>
                <h2>{this.props.name}</h2>
                {this.state.names.map(item => {
                    return <FormItem
                    key={item.name}
                    placeholder={item.placeholder}
                    max={item.max}
                    change={(event) => this.onChangeHandler(event, item.id)}
                    text={item.text}
                    errorMessage={this.state.itemsErrors[item.id-1].msg}
                    type={item.type}
                    />
                })}
                <Button
                    clicked={this.state.validated ? this.props.clicked :  e => this.onSubmitHandler(e)}
                    title={this.props.buttonTitle}
                    url={this.state.validated ? "/logged" : undefined}
                />
                {text}
              
            </MainForm> 
        );   
    }
}

export default Form;