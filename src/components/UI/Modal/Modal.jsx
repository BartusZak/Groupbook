import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxi';
import { ModalBlockDiv } from './Modal.style';


class Modal extends Component{
    shouldComponentUpdate(nextprops, nextstate){
        return nextprops.show !== this.props.show || nextprops.children !== this.props.children;
    }
    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.clickedMethod}/>
                <ModalBlockDiv>
                    <div className="Modal"
                        style={{transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0', 
                        top: this.props.heightPosition}}>
                        
                        {this.props.children}
                    </div>
                </ModalBlockDiv>
                
            </Aux>
        );
    }
}



export default Modal;