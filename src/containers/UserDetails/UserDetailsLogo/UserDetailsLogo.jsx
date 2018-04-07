import ProfilePicture from '../../../assets/img/users/250x400/1.jpg';
import {IMG, ImgDiv} from './UserDetailsLogo.style'; 
import React, { Component } from 'react';
import axios from '../../../axios-users';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';

class UserDetailsLogo extends Component {
        state = { 
            img250x400: false,
            loading: true
         }

         componentDidMount () {
                console.log(this.props);
                this.loadData();
            }

            loadData () {
                if ( this.props.id) {
                    if ( !this.state.img250x400) {
                        axios.get( '/users/' + this.props.id + '.json')
                            .then( response => {
                                console.log(response.data);
                                this.setState({loading: false, img250x400: response.data.img250x400});
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
                if ( this.props.id) {
                        img250x400 = <ImgDiv>
                                <Spinner/>
                                <p style={{ textAlign: 'center' }}>Ładowanie...!</p>
                            </ImgDiv>
                }
                if ( this.state.img250x400 ) {
                        let imgPath = this.state.img250x400;
                        img250x400 = (        
                        <ImgDiv>
                                <IMG className="img-responsive" src="" alt="Zdjęcie Profilowe" />
                        </ImgDiv>
        
                    );
                }
                return img250x400;
            }
        }
        
        export default withErrorHandler(UserDetailsLogo, axios);