import ProfilePicture from '../../../assets/img/users/250x400/1.jpg';
import {IMG, ImgDiv} from './UserDetailsLogo.style'; 
import React, { Component } from 'react';
import axios from 'axios/axios-groupsconnects';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import EmptyAvatarMan from 'assets/img/empty_avatars/empty_avatar_man.jpg';
import EmptyAvatarWoman from 'assets/img/empty_avatars/empty-avatar-girl.jpg';
import {apiPicturesUrl} from 'axios/apiPicturesUrl';

class UserDetailsLogo extends Component {
        state = { 
            profilePicture: false,
            loading: true
         }

         componentDidMount () {
                //console.log(this.props);
                this.loadData();
            }

            loadData () {
                if ( this.props.id) {
                    if ( !this.props.profilePicture && this.props.profilePicture != null) {
                        axios.get( '/pictures/' + this.props.profilePicture, {responseType: "blob"})
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
                let img250x400 = <p style={{ textAlign: 'center' }}>Brak danych :(</p>;
                if (this.props.profilePicture !== null ) {
                        img250x400 = (        
                        <ImgDiv>
                                <IMG className="img-responsive" src={apiPicturesUrl + this.props.profilePicture.profile} alt="Zdjęcie Profilowe" />
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
                            <IMG className="img-responsive" src={(this.props.sex)? require('assets/img/empty_avatars/empty_avatar_man.jpg'): require('assets/img/empty_avatars/empty-avatar-girl.jpg')} alt="Avatar Placeholder" />
                       
                        </ImgDiv>
                    )
                }
                return img250x400;
            }
        }
        
        export default withErrorHandler(UserDetailsLogo, axios);