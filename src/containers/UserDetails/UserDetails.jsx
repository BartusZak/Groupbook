import React, {Component} from 'react';
import {
    UserDetailsDiv,
    RowBottom   } from './UserDetails.style';
import UserDetailsLogo from './UserDetailsLogo/UserDetailsLogo';
import UserDetailsInfo from './UserDetailsInfo/UserDetailsInfo';
import UserGroups from './UserGroups/UserGroups';

import { Container, Row, Col, Alert } from 'reactstrap';
import axios from 'axios/axios-users';
import Aux from 'hoc/Auxi';
import Spinner from 'components/UI/Spinner/Spinner';

class UserDetails extends Component{
    state = {
        user: null,
        groupsIds : [],
        groups: [],
        render: false
    }

    componentWillMount () {
        this.loadData();
        this.loadGroupsIdsOfUser();
    }

    loadData () {
        if ( this.props.match.params.id) {
            if ( !this.state.user) {
                axios.get( 'https://groupsconnectsapi.azurewebsites.net/api/users/' + this.props.match.params.id)
                    .then( response => {
                        this.setState({user: response.data});
                    })
                    .catch(err => {
                        this.setState({user: null});
                    });
            }
        }
        
    }
    loadGroupsIdsOfUser () {
        
        if ( this.props.match.params.id) {
            if ( this.state.groupsIds.length == 0 || this.state.groupsIds === undefined) {
                axios.get( '/usersGroups.json')
                .then( response => {
                    this.setState({test: 100});
                    for (var i = 0; i < response.data.length; i++) {
                        if(response.data[i] != null){
                            if(response.data[i].userId == this.props.match.params.id){
                                this.setState({ groupsIds: [...this.state.groupsIds, response.data[i].groupId]})
                            }
                        }
                    }
                    this.loadGroups();
                })
                .catch(err => {
                    this.setState({groupsIds: null});
                });
            }
        }
    }

    loadGroups(){
        if(this.state.groupsIds.length != 0){
            axios.get ('/groups.json')
                .then( response => {

                    for( let y in this.state.groupsIds){
                        for (var x in response.data) {
                            
                            if(response.data[x] != null){
                                if( x == this.state.groupsIds[y]){
                                    this.setState({ groups: [...this.state.groups, response.data[x]]});
                                    
                                }
                            }
                        }
                            if( y == (this.state.groupsIds.length-1)){
                                this.setState({render: true});
                            }
                    }
                    
                })
                .catch(err => {
                    this.setState({groups: null});
                });
        }

    }

    

    render(){
        //console.log(this.state.user)
        let userGroups = (this.state.render)?  
            <UserGroups user={this.state.user} groups={this.state.groups} groupsIds={this.state.groupsIds}/> : 
            <p>Użytkownik nie należy do żadnej grupy</p>;

        let user = <p>Error</p>;
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
                                    <UserDetailsLogo sex={this.state.user.sex} profilePicture={this.state.user.profilePicture} id={this.props.match.params.id}/>
                            </Col>
                            <Col md="6">
                                <UserDetailsInfo user={this.state.user} />
                            </Col>
                        </Row>
                        
                        <Row style={{
                            textAlign: "center",
                            display: "block",
                            marginTop: "20px"}}>
                            
                            <h3>Grupy do których należy użytkownik</h3>
                            
                        </Row>
                        <RowBottom className="row">
                            <UserGroups groups={this.state.user.userGroups}/>
                        </RowBottom>
                        
                    </Container>
                </UserDetailsDiv>
        }
        else if ( this.props.match.params.id) {
            //console.log(this.props.match);
            user = <UserDetailsDiv style={{paddingTop: "60px"}}>
                <div style={{backgroundColor: "#2c2c36", margin: "0 200px", padding: "30px 0"}}>
                        <Spinner marginTop="unset"/>
                        <p style={{ textAlign: 'center', color: 'white' }}>Ładowanie...!</p>
                </div>
                    </UserDetailsDiv>

                    if(!this.state.user){
                        user = 
                        <Alert color="info">
                            Brak takiego użytkownika!
                        </Alert>
                    }
        }
        else{
            user = <p>ERROR</p>;
        }
       
        

        return user;
    }
}

export default UserDetails;