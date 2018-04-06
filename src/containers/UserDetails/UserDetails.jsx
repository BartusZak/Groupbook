import React, {Component} from 'react';
import {
    UserDetailsDiv,
    RowBottom   } from './UserDetails.style';
import UserDetailsLogo from './UserDetailsLogo/UserDetailsLogo';
import UserDetailsInfo from './UserDetailsInfo/UserDetailsInfo';
import UserGroups from './UserGroups/UserGroups';

import { Container, Row, Col } from 'reactstrap';

class UserDetails extends Component{
    state = {

    }
    render(){
        return(
            <UserDetailsDiv>
                <Container fluid={true}>
                    <Row style={{paddingTop: "20px"}}>
                        <Col md="5" style={{
                            flex: 1,
                            display:  "flex",
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                                <UserDetailsLogo id={this.props.match.params.id}/>
                        </Col>
                        <Col md="6">
                            <UserDetailsInfo id={this.props.match.params.id}/>
                        </Col>
                    </Row>
                    
                    <Row style={{
                        textAlign: "center",
                        display: "block",
                        marginTop: "20px"}}>
                        
                        <h3>Grupy do których należy użytkownik</h3>
                        
                    </Row>
                    <RowBottom className="row">
                        
                        <UserGroups/>
                        
                    </RowBottom>
                    
                </Container>
            </UserDetailsDiv>
        )
    }
}

export default UserDetails;