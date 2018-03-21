import React, { Component } from 'react';
import NavigationBar from '../../../components/UI/UserBlockNavigationBar/UserBlockNavigationBar';
import MessagesBlock from './MessagesBlock/MessagesBlock';
import PostsBlock from './PostsBlock/PostsBlock';
import GroupsBlock from './GroupsBlock/GroupsBlock';
import Aux from 'hoc/Auxi';

class UserBlock extends Component {
    state = {
        isShowMessages: false,
        isShowGroups: true,
        isShowMyPosts: false
    }

    changeShowMessages = () => {
        let copiedState = [...this.state.isShowMessages];
        copiedState = !this.state.isShowMessages;
        this.setState({isShowMessages: copiedState, isShowGroups: false, isShowMyPosts: false});
        
    }
  
    changeShowGroups = () => {
        let copiedState = [...this.state.isShowGroups];
        copiedState = !this.state.isShowGroups;
        this.setState({isShowGroups: copiedState, isShowMessages: false, isShowMyPosts: false});
 
    }
    changeShowPosts = () => {
        let copiedState = [...this.state.isShowMyPosts];
        copiedState = !this.state.isShowMyPosts;
        this.setState({isShowMyPosts: copiedState, isShowGroups: false, isShowMessages: false});

    }
    render(){
        let whatRender = null;

        if(this.state.isShowMessages){
            whatRender = <MessagesBlock />;
        } 

        if(this.state.isShowMyPosts){
            whatRender = <PostsBlock />
        }

        if(this.state.isShowGroups){
           whatRender = <GroupsBlock />;
        }

        return (
            <Aux>
                <NavigationBar clickMessage={this.changeShowMessages}
                clickGroups={this.changeShowGroups}
                clickPosts={this.changeShowPosts}
                />
                {whatRender}
            </Aux>
        );
    }
}


export default UserBlock;