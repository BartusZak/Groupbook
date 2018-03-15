import React, { Component } from 'react';
import PostShortcut from '../../components/PostShortcut/PostShortcut';
import ProfilePic from '../../assets/img/profiles/facet.jpg';
import Avatar from '../../components/UI/Avatar/Avatar';
import axios from '../../axios-post';
import Spinner from '../../components/UI/Spinner/Spinner';
import SpinnerContainer from '../../hoc/SpinnerContainer/SpinnerContainer';
import UserBlock from './UserBlock/UserBlock';


class UserStart extends Component {

   
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            error: false,
            isLoading: false,
            start: 0,
            end: 4,
            isSticky: false
        }
        this.handleScroll = this.handleScroll.bind(this);
      }
      
      
      
    

    componentDidMount(){

        window.addEventListener('scroll', this.handleScroll);

        this.setState({isLoading: true});
        axios.get('/posts')
        .then(response => {
          
            const responseData = response.data.slice(this.state.start, this.state.end);
            this.setState({data: responseData, isLoading: false});
        }).catch(error => {
            
            this.setState({error: true, isLoading: false});
        });
   
      
    }   

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };
      
    handleScroll() {
        let oldState = [...this.state];
        if(window.pageYOffset > 100){
            oldState.isSticky = true;
        }
        else{
            oldState.isSticky = false;
        }
        
        this.setState({isSticky: oldState.isSticky});
        
    };


    generateNextData = () => {
        this.setState({isLoading: true});
        let oldState = [...this.state];
        oldState.start = this.state.start + 4;
        oldState.end = this.state.end + 4;
        axios.get('/posts')
            .then(response => {
                const responseData = response.data.slice( oldState.start, oldState.end);
                this.setState({data: responseData, isLoading: false});
            }).catch(error => {
                this.setState({error: true, isLoading: false});
            });
        this.setState({start: oldState.start, end: oldState.end});

    }
    
    render(){
        let posts = this.state.isLoading ? <Spinner /> : <PostShortcut 
        data={this.state.data} 
        error={this.state.error}
        clicked={this.generateNextData}/>;
  
        if(this.state.error){
            posts = <PostShortcut data={this.state.data} error={this.state.error} clicked={this.generateNextData}/>
        }
 
        return (
            <SpinnerContainer>
                {posts}
                <UserBlock isSticky={this.state.isSticky}/>
            </SpinnerContainer>
          
        );
    }
}


export default UserStart;


