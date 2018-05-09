import React, {Component} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import './OptionBlock.css';
import Modal from '../../UI/Modal/Modal';
import AddPictureBar from '../../UI/AddPictureBar/AddPictureBar';
import Aux from 'hoc/Auxi';
import axios from 'axios/axios-groupsconnects';
import ChangePassword from './ChangePassword/ChangePassword';
import DeleteAccount from './DeleteAccount/DeleteAccount';


class optionBlock extends Component{
    state = {
        files: [],
        incorrectPictureError: "",
        showChangeAvatar: false,
        showChangePassword: false,
        showDeleteAccount: false,
    };

    onDrop = (files) => {
        const correctFormats = ['jpg','jpeg','png'];
        let counter = 0;
        for(let key in correctFormats){
            if(files[0].type === "image/" + correctFormats[key]){
                counter = counter+1;
            }
        }
        if(counter > 0){
            this.setState({files: files, incorrectPictureError: ""});
        }
        else{
            this.setState({incorrectPictureError: "Dodane zdjęcie posiada niedopuszczalny format"});
        }
    }

    deleteFiles = () => {
        this.setState({files: []});
    }

    onSubmitHandler = e => {
        e.preventDefault();
        let f = new FormData();
            f.append('userId', JSON.parse(localStorage.getItem('responseObject')).id);
            f.append('avatar', this.state.files[0]);
    
        axios.post("/api/account/AddAvatar", f)
            .then(response => {
                console.log(response)
                this.setState({showChangeAvatar: !this.state.showChangeAvatar});
                window.location.reload();
            })
            .catch(error =>{
                console.log(error);
                console.log(error.response)
            });
    }

    changeShowChangeAvatar = () => {this.setState({showChangeAvatar: !this.state.showChangeAvatar})};
    changeShowChangePassword = () => {this.setState({showChangePassword: !this.state.showChangePassword})};
    changeDeleteAccount = () => {this.setState({showDeleteAccount: !this.state.showDeleteAccount})};

    render(){
        let onClickFunction;

        //zmiana awataru
        if(this.props.number === "1"){
            onClickFunction = this.changeShowChangeAvatar;
        }
        //zmiana hasła
        else if (this.props.number === "2"){
            onClickFunction = this.changeShowChangePassword;
        }
        //usuwanie konta
        else if (this.props.number === "3"){
            onClickFunction = this.changeDeleteAccount;
        }
        return(
        <Aux>
            <div className="OptionBlock">
                <h5>{this.props.title}</h5>
                <div onClick={onClickFunction}>

                    <i className={this.props.icon}></i>

                    
            
                    <div className="Informations">
                        <p>{this.props.function}</p>
                        <b style={{fontWeight: 'initial'}}>{this.props.shortContent}</b>
                    </div>
                </div>  
            </div>
            <Modal modalClass="minWidth800" show={this.state.showChangeAvatar} clickedMethod={this.changeShowChangeAvatar}>
            
                <AddPictureBar
                mainLabelTitle="Zmień avatar"
                buttonTitle="Zatwierdź"
                filesLength={this.state.files.length}
                onDropHandler={file => this.onDrop(file)}
                filesErrorType={this.state.incorrectPictureError}
                files={this.state.files}
                deleteAddedPictureHandler={this.deleteFiles}
                onSubmitHandler={e => this.onSubmitHandler(e)}
                isGroupForm={false} 
                height="100%"
                />

            </Modal>

            <Modal modalClass="minWidth800" show={this.state.showChangePassword} clickedMethod={this.changeShowChangePassword}>
               <ChangePassword/>
            </Modal>

            <Modal modalClass="minWidth800" show={this.state.showDeleteAccount} clickedMethod={this.changeDeleteAccount}>
               <DeleteAccount/>
            </Modal>
        </Aux>
    );
}
}
export default optionBlock;