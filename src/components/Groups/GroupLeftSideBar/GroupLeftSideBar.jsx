import React, { Component } from 'react';
import './GroupLeftSideBar.css';
import FacetStock from '../../../assets/img/profiles/facet.jpg';
import GroupLeftSideBarSingleItem from './GroupLeftSideBarSingleItem/GroupLeftSideBarSingleItem';

class GroupLeftSideBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFixed: false
        }
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount(){ window.addEventListener('scroll', this.handleScroll) }
        
    
    handleScroll = () => {
        const oldState = [...this.state];
        if(window.pageYOffset >= 151) oldState.isFixed = true;
        else oldState.isFixed = false;
            
        this.setState({isFixed: oldState.isFixed});
    }
    componentWillUnmount() { window.removeEventListener('scroll', this.handleScroll); };
    render(){
        return(
            <div className={this.state.isFixed ? "fixed-class left-group-block" : "absolute-class left-group-block"} >
                <p className="left-group-recent-add">
                    Ostatnio dodani
                </p>
                <ul className="left-group-last-add-block">
                    <GroupLeftSideBarSingleItem pic={FacetStock}/>
                    <GroupLeftSideBarSingleItem pic={FacetStock}/>
                    <GroupLeftSideBarSingleItem pic={FacetStock}/>
                    <GroupLeftSideBarSingleItem pic={FacetStock}/>
                    <GroupLeftSideBarSingleItem pic={FacetStock}/>
                </ul>
                <div className="rotate-icon-users">
                    <i className="fa fa-fast-forward"></i>
                    <i className="fa fa-fast-backward"></i>
                </div>
                
            </div>
        );
    }
}

export default GroupLeftSideBar;