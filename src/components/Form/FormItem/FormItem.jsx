import React, {Component} from 'react';
import './FormItem.css';

class FormItem extends Component {
        state = {
            text: "",
            disable: false
        }

        
    onChangeHandler = (event) => {
        let oldState = [...this.state.text];
        const min = this.props.min;
        const max = this.props.max;
        oldState = event.target.value;
  
            if(oldState.length < min){
                oldState = "Pole " + this.props.title 
                + " powinno zawierać co najmniej " 
                + min + " znaków.";
    
             
            }
            else if(oldState.length > max){
                oldState = "Pole " + this.props.title 
                + " powinno zawierać co najwyżej " 
                + max + " znaków.";
    
            }
            else{
                oldState = "";
                
            }
            this.setState({text: oldState});
    }

   

    render(){
        const isPassword = this.props.title === "Hasło" ? "password" : "text";

        return(
            <div className="form-item">
                <p className="Label">{this.props.title}</p>
                <input type={isPassword} placeholder={this.props.placeholder} onChange={(event) => this.onChangeHandler(event)}/>
                <p className="errorMessage">{this.state.text}</p>
            
            </div>
        );
    }
}


export default FormItem;