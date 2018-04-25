import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Group from './Group/Group';
import { connect } from 'react-redux';
import { fetchGroupsActionCreator } from '../../../store/Groups/Actions';
import Spinner from '../../UI/Spinner/Spinner';
import './GroupsBlock.css';
import Back from '../../../assets/img/groupimages/back.jpg';


class GroupsBlock extends Component {
    state = {
        animation: false,
        loadingGroupSpinner: true
    }
    componentDidMount(){
        const responseObject = JSON.parse(localStorage.getItem('responseObject'));
        this.props.fetchGroups(responseObject.id);
    }
    componentDidUpdate(prevProps){
        if(prevProps.fetchedGroups !== this.props.fetchedGroups){
            this.setState({loadingGroupSpinner: false});
        }
    }
    iniciateAnimationHandler = () => {
        this.setState({animation: !this.state.animation});
    }
    render(){
        return(
                <div className="main-cont">
                    <p>
                        <span>Twoje grupy</span>
                        <i className="fa fa-info-circle"
                        onClick={() => this.iniciateAnimationHandler()}></i>
                    </p>
                


                    {this.state.loadingGroupSpinner ? <Spinner /> :
                    this.props.fetchedGroups.userGroups === undefined ? 
                    null : this.props.fetchedGroups.userGroups.map(i => {
                        return <Group key={i.group.id}
                        animation={this.state.animation}
                        name={i.group.name}
                        description={i.group.description}
                        picture={i.group.picture === null ?
                            Back : i.group.picture.smallResolutionPicName}
                        addDate={i.joinDate}
                        id={i.group.id}
                        moderator={i.group.moderator ? i.group.moderator.username : "Brak"} 
                        />
                    })}
                </div> 
        );
    }
}


const mapStateToProps = state => {
    return {
        fetchedGroups: state.GroupReducer.fetchedGroups,
        fetchedGroupsErrors: state.GroupReducer.fetchedGroupsErrors

    };
}
const mapDispatchToProps = dispatch => {
    return {
        fetchGroups: (userId) => dispatch(fetchGroupsActionCreator(userId))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupsBlock);


