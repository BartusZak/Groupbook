import ProfilePicture from '../../../assets/img/users/250x400/1.jpg';
import {IMG, ImgDiv} from './UserDetailsLogo.style'; 
import React, { Component } from 'react';
import axios from '../../../axios-users';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';

class UserDetailsLogo extends Component {
        state = { 
            profilePicture: false,
            loading: true
         }

         componentDidMount () {
                // console.log(this.props);
                this.loadData();
            }

            loadData () {
                if ( this.props.id) {
                    if ( !this.props.profilePicture && this.props.profilePicture != null) {
                        axios.get( 'https://groupsconnectsapi.azurewebsites.net/pictures/' + this.props.profilePicture, {responseType: "blob"})
                            .then( response => {
                               // console.log(response);
                                this.setState({loading: false, profilePicture: URL.createObjectURL(response.data)});
                            })
                            .catch(err => {
                                this.setState({loading: false});
                            });
                                // console.log(response);
                    }
                }
            }
        
            render() {
                //console.log()
                
                
                let img250x400 = <p style={{ textAlign: 'center' }}>Brak danych :(</p>;
                if (this.props.profilePicture !== null ) {
                        img250x400 = (        
                        <ImgDiv>
                                <IMG className="img-responsive" src={"https://groupsconnectsapi.azurewebsites.net/pictures/" + this.props.profilePicture.profile} alt="Zdjęcie Profilowe" />
                        </ImgDiv>
        
                    );
                }
                else if ( this.props.id) {
                    img250x400 = <ImgDiv>
                            <Spinner/>
                            <p style={{ textAlign: 'center' }}>Ładowanie...!</p>
                        </ImgDiv>
                 }
                if (this.props.profilePicture == null){
                    img250x400 = (   
                        <ImgDiv>     
                            <p style={{margin: "0"}}>Brak zdjęcia profilowego</p>
                        </ImgDiv>
                    )
                }
                return img250x400;
            }
        }
        
        export default withErrorHandler(UserDetailsLogo, axios);