import React, {Component} from 'react';
import Aux from 'hoc/Auxi';
import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actionCreators from 'store/actions/deleteAccount';
import { Redirect } from 'react-router'

class deleteAccount extends Component{
    constructor() {
        super();
        this.state = {
            checkboxCheked: false,
            redirect: false,
            error: null,
            response: null,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onAccountRemoveHandler = this.onAccountRemoveHandler.bind(this);
    }
    
    componentDidMount(){
        this.setState({response: null, error: null});
    }

    handleInputChange(){
        this.setState({checkboxCheked: !this.state.checkboxCheked })
    }


    onAccountRemoveHandler(){
        //spinner na true
        this.props.setLoadingToTrue();
        
        //axios 
       this.props.deleteAccount(JSON.parse(localStorage.getItem('responseObject')).token);
        
    }

    componentWillReceiveProps(nextProps){
        if(this.props.response !== nextProps.response){
            this.setState({response: nextProps.response});
        }
    }


    render(){
        let content;

        if (this.state.redirect) {
            return <Redirect to='/'/>;
          }
        
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
        if(this.state.response !== null){
            console.log(this.state.response)

                if(!this.props.response.data.isError){
                    content = <p style={{color: 'green', fontWeight: 'bold'}}>Konto zostało poprawnie usunięte!</p>
                    setTimeout(() => {
                        //window.localStorage.clear();
                        window.location.reload();
                        //return  <Redirect to='/'/>
                    }, 300);
                }
                else if(this.props.response.data.status !== 200){
                    console.log(this.props.response.errors);
                    content = <p>Błąd serwera ziomuś</p>;
                    if (this.props.response.data !== null){
                        content = 
                        (
                        <Aux>
                            <p>Error</p>
                            <ul style={{margin: '0px'}}>
                                {this.props.response.data.errors.map((item) => 
                                    <li style={{color: 'red', fontWeight: 'bold'}} key={item}>{item}</li>
                                
                            )}
                            </ul>
                        </Aux>);
                    }
                }
             //this.setState({response: null});
        }


        return(
            <div className="modal-bartuszak">
                <div>
                    <i style={{display: 'inline-flex', marginBottom: '20px'}} className="fa fa-close den"></i>
                    {content}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    response: state.deleteAccount.response,
    loading: state.deleteAccount.loading,
});

const mapDispatchToProps = dispatch => {
    return {
        //loggingOut: () => dispatch(loggingOut())
    };
}

export default connect (mapStateToProps, actionCreators)(deleteAccount);