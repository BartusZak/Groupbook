import React, { Component } from 'react';
import './UniversalForm.css';
import { validateInput } from '../../containers/UserOptions/Validation/Validation';


class UniversalForm extends Component{
    state = {
        inputValues: this.props.array
    }

    onChangeHandlerInput = (event, id) => {
        let oldList = [...this.state.inputValues];
        const index = oldList.findIndex( p => {
            return p.id === id;
        })
        oldList[index].value = event.target.value;

        this.setState({inputValues: oldList});
    }
    onSubmitHandler = e => {
        e.preventDefault();
        let newItems = [...this.state.inputValues];
        newItems[0].error = validateInput(5,15,newItems[0].value,"", "");
        newItems[1].error = validateInput(5,200,newItems[1].value, "", "");
        this.setState({inputValues: newItems});
    }
    render(){
        return(
        <form onSubmit={this.onSubmitHandler} className="universal-form">
             {this.props.array.map( item => {
                return (<section key={item.id} className="input-holders">
                     <label>{item.name}</label>
                     {item.type === "textarea" ? 
                     <textarea value={this.state.inputValues[item.id].value}
                        onChange={(event) => this.onChangeHandlerInput(event, item.id)}
                        placeholder={item.placeholder}>
                    </textarea> : 
                     <input className={this.state.inputValues[item.id].error === "" ? "" : 
                    "invalid-inputs"} value={this.state.inputValues[item.id].value} onChange={(event) => this.onChangeHandlerInput(event, item.id)} 
                     type={item.type} placeholder={item.placeholder} />}
                     <p className={this.state.inputValues[item.id].error === "" ?
                     "invisible-message" : "invalid-message"}>
                    asdadasdassadd{this.state.inputValues[item.id].error}</p>
                </section>);
            })} 
            <input className="submit-button" type="submit" value="Dalej" />
        </form>
        );
    }
}
export default UniversalForm;