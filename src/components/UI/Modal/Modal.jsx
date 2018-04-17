import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi';
import { ModalDiv } from './Modal.style';
import 'font-awesome/css/font-awesome.min.css';

class Modal extends Component{
    shouldComponentUpdate(nextprops, nextstate){
        return nextprops.show !== this.props.show || nextprops.children !== this.props.children;
    }

    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.clickedMethod}/>
                <ModalDiv
                    className={this.props.modalClass} 
                    style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'}}>
                    <i onClick={this.props.clickedMethod} className="fa fa-times closeIcon" aria-hidden="true"></i>
                    {this.props.children}
                </ModalDiv>
            </Aux>
        );
    }
}



export default Modal;