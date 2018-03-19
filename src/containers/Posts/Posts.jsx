import React, { Component } from 'react';
import Aux from '../../hoc/Auxi';
import './Posts.css';
import 'font-awesome/css/font-awesome.min.css';
import Button from '../../components/UI/Button';
import SinglePost from './SinglePost/SinglePost';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchingPosts } from '../../containers/UserOptions/Store/actions';
import SideMenu from '../../components/UI/SideMenu/SideMenu';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
class Posts extends Component{
    state = {
        showSideMenu: false
    }
    componentDidMount(){
        this.props.initializePosts();
    }
    ShowSideMenu = () => {
        this.setState({showSideMenu: true});
    }
    HideSideMenu = () => {
        this.setState({showSideMenu: false});
    }
    render(){
        let Content = null;
        //console.log(this.props.posts);
        if(!this.props.postErrorLoading)
        {
            Content = ( this.props.spinner ? <Spinner /> :
                <Aux>
                     <SinglePost />
                     <SinglePost />
                     <SinglePost />
                     <SinglePost />
                    <Button title="Następne" overRideClass="Carrot-button Pomangerate"/>
                </Aux>
            );
        }
        else   
            Content = this.props.spinner ? <Spinner /> : <h2>Wystąpił błąd podczas ładowania postu</h2>;
       
        return(
            <main className="PostContainer">
                <SideMenu IsDisplay={this.state.showSideMenu}>
                    <ul>
                        <li>
                            Penetratorzy
                        </li>
                        <li>
                            Liczy rzepy kalarepy
                        </li>
                        <li>
                            Wojownicy krola kapcia
                        </li>
                    </ul>
                </SideMenu> 
                <Backdrop show={this.state.showSideMenu} clicked={this.HideSideMenu} backGround="Blank"/>
                <nav className="PostNavigate">
                    <b className="GroupName">Poczekalnia</b><i onClick={() => this.ShowSideMenu()} className="fa fa-users"> </i> 
                </nav>
                <div className="PostMainBlock">
                    {Content}
                </div>
                
            </main>
           
        );
    }
}


const mapStateToProps = state => {
    return {
        posts: state.userOptionsRed.posts,
        postErrorLoading: state.userOptionsRed.errorPostLoading,
        spinner: state.userOptionsRed.spinner
    };
}
const mapDispatchToProps = dispatch => {
    return {
        initializePosts: () => dispatch(fetchingPosts())
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts);


