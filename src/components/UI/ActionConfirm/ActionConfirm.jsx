import React, { Component } from 'react';
import './ActionConfirm.css';
import Backdrop from '../Backdrop/Backdrop';


class ActionConfirm extends Component {
    state = {
        inlineStyles: {}
    }
 
    componentDidMount(){
        window.addEventListener('resize', this.handleWindowResize = this.handleWindowResize.bind(this))
        this.handleWindowResize();
    }
    componentWillUnmount(){
        window.removeEventListener('resize', this.handleWindowResize = this.handleWindowResize.bind(this));
    }
    handleWindowResize = () => {
        let inlineStyles = null;
        if(this.props.mode === "Small"){
            if(document.documentElement.clientWidth < 600){
                inlineStyles = {
                    width: document.documentElement.clientWidth*0.9,
                    height: document.documentElement.clientHeight*0.5,
                    left: (document.documentElement.clientWidth*0.1)*50/100,
                    top: (document.documentElement.clientHeight*0.25)*50/100
                }
            }
            else{
                inlineStyles = {
                    width: document.documentElement.clientWidth*0.4,
                    height: document.documentElement.clientHeight*0.5,
                    left: (document.documentElement.clientWidth*0.6)*50/100,
                    top: (document.documentElement.clientHeight*0.5)*50/100
                }
            }
            
        }
        else{
            inlineStyles = {
                width: document.documentElement.clientWidth*0.75,
                height: document.documentElement.clientHeight*0.75,
                left: (document.documentElement.clientWidth*0.5)*25/100,
                top: (document.documentElement.clientHeight*0.5)*25/100
            }
        }
        this.setState({inlineStyles: inlineStyles});
    }
    render() { 

        return ( 
                
            <Backdrop show={this.props.show}>
                <i onClick={this.props.clicked} className="fa fa-times cls"></i>
                <div style={this.state.inlineStyles} className={`action-confirm ${this.props.show ? 
                    "action-in" : "action-out"}`}>
                    {this.props.children}
                </div>
            </Backdrop>
           
        )
    }
}
 
export default ActionConfirm;