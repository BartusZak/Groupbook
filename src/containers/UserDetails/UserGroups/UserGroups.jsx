import React from 'react';
import ProfilePicture from '../../../assets/img/profiles/userTemplate.jpg';
import {UserGroupsDiv} from './UserGroups.style'; 

import { Col } from 'reactstrap';

const UserGroups = (props) => (
    <UserGroupsDiv className="container-fluid">
        <Col lg="4">
            <div className="form_hover " style={{ backgroundImage: `url(${ProfilePicture})`, backgroundSize: 'contain'}}>
            <p style={{textAlign: "center", marginTop: "20px"}}>
                <i className="fa fa-user" style={{fontSize: "147px"}}></i>
            </p>
            <div className="header">
                    <div className="blur"></div>
                    <div className="header-text">
                        <div className="panel panel-success" style={{height: "247px"}}>
                            <div className="panel-heading">
                                <h3>Penetratorzy</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    Ilość członków:<b>10</b>
                                </div>
                                <div className="form-group">
                                    Informacje o grupie:<br/>
                                    <b>Grupa super programistów. Kto by nie chciał być programistą w tych czasach?</b>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </Col>

        <Col  lg="4">
            <div className="form_hover " style={{ backgroundImage: `url(${ProfilePicture})`, backgroundSize: 'contain'}}>
            <p style={{textAlign: "center", marginTop: "20px"}}>
                <i className="fa fa-user" style={{fontSize: "147px"}}></i>
            </p>
            <div className="header">
                    <div className="blur"></div>
                    <div className="header-text">
                        <div className="panel panel-success" style={{height: "247px"}}>
                            <div className="panel-heading">
                                <h3>Penetratorzy</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    Ilość członków:<b>10</b>
                                </div>
                                <div className="form-group">
                                    Informacje o grupie:<br/>
                                    <b>Grupa super programistów. Kto by nie chciał być programistą w tych czasach?</b>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </Col>

        <Col lg="4">
            <div className="form_hover " style={{ backgroundImage: `url(${ProfilePicture})`, backgroundSize: 'contain'}}>
            <p style={{textAlign: "center", marginTop: "20px"}}>
                <i className="fa fa-user" style={{fontSize: "147px"}}></i>
            </p>
            <div className="header">
                    <div className="blur"></div>
                    <div className="header-text">
                        <div className="panel panel-success" style={{height: "247px"}}>
                            <div className="panel-heading">
                                <h3>Penetratorzy</h3>
                            </div>
                            <div className="panel-body">
                                <div className="form-group">
                                    Ilość członków:<b>10</b>
                                </div>
                                <div className="form-group">
                                    Informacje o grupie:<br/>
                                    <b>Grupa super programistów. Kto by nie chciał być programistą w tych czasach?</b>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </Col>
    </UserGroupsDiv>
);

export default UserGroups;