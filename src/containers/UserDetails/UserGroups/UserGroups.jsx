import React, {Component} from 'react';
import ProfilePicture from '../../../assets/img/profiles/userTemplate.jpg';
import {UserGroupsDiv} from './UserGroups.style'; 

import { Col } from 'reactstrap';

import {apiPicturesUrl} from 'axios/apiPicturesUrl';

class UserGroups extends Component {
    state = { 
        groups: this.props.groups,
    }
    render() {
        let groups = <p>Użytkownik nie należy do żadnej grupy</p>;
        let img = ProfilePicture;

        if(this.state.groups != null){
            groups = this.state.groups.map((group, index) => {
                
                if (group.group.picture != null){
                    img = apiPicturesUrl + group.group.picture.mediumResolutionPicName;
                }
                return (
                    <Col key={index} lg="4">
                        <div className="form_hover " style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover'}}>
                        <p style={{textAlign: "center", marginTop: "20px"}}>
                            <i className="fa fa-user" style={{fontSize: "147px"}}></i>
                        </p>
                        <div className="header">
                                <div className="blur"></div>
                                <div className="header-text">
                                    <div className="panel panel-success" style={{height: "247px"}}>
                                        <div className="panel-heading">
                                            <h3>{group.group.name}</h3>
                                        </div>
                                        <div className="panel-body">
                                            <div className="form-group">
                                                Informacje o grupie:<br/>
                                                <b>{group.group.description}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        </div>
                    </Col>
                );
            });
        }
        let content = (
            <UserGroupsDiv className="container-fluid">
                {groups}
            </UserGroupsDiv>
        );

        return content;
    }
    }
    export default UserGroups;