import React, { Component } from 'react';
import './Posts.css';
import Post from './Post/Post';
import Aux from '../../hoc/Auxi';
import UserNavbar from '../UserNavbar/UserNavbar';


class Posts extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFixed: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount(){ window.addEventListener('scroll', this.handleScroll) }
    handleScroll = () => {
        let oldFix = [...this.state.isFixed];
        if(window.pageYOffset > 600)
            oldFix = true;
        else
            oldFix = false
        
        this.setState({isFixed: oldFix}); 
    }
    componentWillUnmount() { window.removeEventListener('scroll', this.handleScroll); };

    render(){
        return(
        <Aux>
            <p className="event-info">Posty</p>
            <div className="post-two-elements-container">
                <ul className="post-block-container">
                    {Object.keys(this.props.posts)
                    .map( igKey => {
                        return [...Array(this.props.posts[igKey])].map((item,i) => {
                            return <Post key={igKey} postId={1} 
                            description={item.postContent} 
                            postTitle={item.postTitle}
                            addDate={item.addDate}
                            userName={item.userName}/>    
                        });
                    })}
                </ul>
                <UserNavbar isFixed={this.state.isFixed ? "position-fixed" : ""}>dsad</UserNavbar>
            </div>
        </Aux>
        );
    }
}


export default Posts;



