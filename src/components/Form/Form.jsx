import React, {Component} from 'react';
import './Form.css';
import FormItem from './FormItem/FormItem';
import Button from '../UI/Button';
import Aux from '../../hoc/Auxi';


class Form extends Component {
    state = {
        buttonDisabled: false,
        loginItems: this.props.loginItems
    }
    onChangeHandler = (event, id) => {
        const index = this.state.loginItems.findIndex(p => {
            return p.id === id;
        });

        const item = {
            ...this.state.loginItems[index]
        }
        item.text = event.target.value;
        const newItems = [...this.state.loginItems];
        const min = item.min;
        const max =  item.max; 
        
            if(item.text.length < min){
                item.text = "Pole " + item.name 
                + " powinno zawierać co najmniej " 
                + min + " znaków.";
        
            
            }
            else if(item.text.length > max){
                item.text = "Pole " + item.name
                + " powinno zawierać co najwyżej " 
                + max + " znaków.";
            }
            else{
                item.text = "";
             
                
            }
            newItems[index] = item; 
            this.setState({loginItems: newItems});
            this.handlingButtonDisable();

           
            
           
    }
    handlingButtonDisable = () => {
        const loginItems = [...this.state.loginItems];
        let btnDisable = false;
        
        for(let key in loginItems){
            if(loginItems[key].text.length !== 0)
                btnDisable = true;
        }

        this.setState({buttonDisabled: btnDisable});
    }
    render(){
        const form = (
            <Aux>
                <h2>{this.props.name}</h2>
                {this.state.loginItems.map(item => {
                    return <FormItem title={item.name}
                    key={item.name}
                    placeholder={item.placeholder}
                    min={item.min}
                    max={item.max}
                    change={(event) => this.onChangeHandler(event, item.id)}
                    text={item.text}
                    
                    />
                })}
                <Button title="Zaloguj" isDisable={this.state.buttonDisabled} clicked={this.props.clicked}/>
            </Aux>
        );


        return (
            <div className="Form">
                {form}
            </div>
        );
    }
}



export default Form;