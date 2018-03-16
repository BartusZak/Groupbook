import React, {Component} from 'react';
import { MainForm } from './Form.style'
import FormItem from './FormItem/FormItem';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';



class Form extends Component {
    state = {
        loginItems: this.props.loginItems, // Co ma byc wrzucone w formularz
        itemsErrors: this.props.errors, // Dostepne errory
        validated: false         // Stan walidacji
    }

    Validate = () => {
        const errors = [...this.state.itemsErrors];
        const oldState = [...this.state.loginItems];
  
        let result = true;
        for(let key in oldState){
            errors[key].msg = "";
            if(oldState[key].text.length < oldState[key].min){
                errors[key].msg = "Pole " + oldState[key].name + " musi zawierać minimalnie " + oldState[key].min + " znaków";
                errors[key].isError = true;
                result = false;
            }
            if(oldState[key].text.length > oldState[key].max){
                errors[key].msg = "Pole " + oldState[key].name + " może zawierać maksymalnie " + oldState[key].max + " znaków";  
                errors[key].isError = true;
                result = false;
            }
        }
        

        this.setState({...this.state, itemsErrors: errors, validated: result});
       
    }
    onSubmitHandler = e => { 
        e.preventDefault();
        this.Validate();
    }
    //
    onChangeHandler = (event, id) => {
        const index = this.state.loginItems.findIndex(p => {
            return p.id === id;
        });
        const item = {
            ...this.state.loginItems[index]
        }
        item.text = event.target.value;
        const newItems = [...this.state.loginItems];

        newItems[index] = item; 
        this.setState({loginItems: newItems});    
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
                {this.state.loginItems.map(item => {
                    return <FormItem
                    key={item.name}
                    placeholder={item.placeholder}
                    max={item.max}
                    change={(event) => this.onChangeHandler(event, item.id)}
                    text={item.text}
                    errorMessage={this.state.itemsErrors[item.id-1].msg}
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