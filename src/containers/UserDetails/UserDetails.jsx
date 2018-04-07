import React, {Component} from 'react';
import {
    UserDetailsDiv,
    RowBottom   } from './UserDetails.style';
import UserDetailsLogo from './UserDetailsLogo/UserDetailsLogo';
import UserDetailsInfo from './UserDetailsInfo/UserDetailsInfo';
import UserGroups from './UserGroups/UserGroups';

import { Container, Row, Col, Alert } from 'reactstrap';
import axios from '../../axios-users';
import Aux from 'hoc/Auxi';
import Spinner from 'components/UI/Spinner/Spinner';

class UserDetails extends Component{
    state = {
        user: null
    }

    componentDidMount () {
        this.loadData();
    }

    loadData () {
        if ( this.props.match.params.id) {
            if ( !this.state.user) {
                axios.get( '/users/' + this.props.match.params.id + '.json')
                    .then( response => {
                        console.log(response);
                        this.setState({user: response.data});
                    })
                    .catch(err => {
                        this.setState({user: null});
                        console.log("error");
                    });
            }
        }
    }

    render(){
        let user = <p>Error</p>;
        if ( this.props.match.params.id) {
            user = <Aux>
                        <Spinner/>
                        <p style={{ textAlign: 'center' }}>Ładowanie...!</p>
                    </Aux>
        }
        if ( this.state.user ){
            user = 
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
        }
        else{
            user = 
            <Alert color="info">
                Brak takiego użytkownika!
            </Alert>
        }

        return user;
    }
}

export default UserDetails;