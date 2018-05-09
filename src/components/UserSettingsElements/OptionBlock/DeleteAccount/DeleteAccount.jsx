import React, {Component} from 'react';
import Aux from 'hoc/Auxi';
import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner/Spinner';

import {connect} from 'react-redux';
import * as actionCreators from 'store/actions/deleteAccount';

class deleteAccount extends Component{
    constructor() {
        super();
        this.state = {
            checkboxCheked: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onAccountRemoveHandler = this.onAccountRemoveHandler.bind(this);
    }
    
    handleInputChange(){
        this.setState({checkboxCheked: !this.state.checkboxCheked })
    }

    onAccountRemoveHandler(){
        this.props.setLoadingToTrue();
        
        this.props.deleteAccount(JSON.parse(localStorage.getItem('responseObject')).token);
        setTimeout( () => {
            console.log(this.props);
        }, 3000);
       
    }
    

    render(){
        let content;
       
        
        content = (
            <Aux>
                <div>
                <input
                    id="confirmation"
                    type="checkbox"
                    checked={this.state.checkboxCheked}
                    onChange={this.handleInputChange} />
                    <label onClick={this.handleInputChange}>Czy na pewno chcesz usunąć konto?</label>
                </div>
               
                    <Button disabled={!this.state.checkboxCheked} clicked={this.onAccountRemoveHandler} title="Usuń konto"/>
            </Aux>
        );        

        if(this.props.loading){
            content = <Spinner/>;
        }

        if(this.props.response !== null){
            content = <p>Konto zosało poprawnie usunięte!</p>

            if(this.props.response.status !== 200){
                content = <p>Error</p>;
            }
        }

        return(
            <Aux>
                {content}
            </Aux>
        )
    }
}


const mapStateToProps = state => ({
    response: state.deleteAccount.response,
    loading: state.deleteAccount.loading
});

export default connect (mapStateToProps, actionCreators)(deleteAccount);