import React, {Component} from 'react';
import './Form.css';
import FormItem from './FormItem/FormItem';
import Button from '../UI/Button';

class Form extends Component {
    state = {
        buttonDisabled: false
    }

    render(){
        const Items = this.props.loginItems;
//elo
        return (
            <div className="Form">
                <h2>{this.props.name}</h2>
                {Items.map(item => {
                    return <FormItem title={item.name}
                    key={item.name}
                    placeholder={item.placeholder}
                    min={5}
                    max={15}
                    />
                })}
                <Button title="Zaloguj" disable={this.state.buttonDisabled}/>
            </div>
        );
    }
}



export default Form;