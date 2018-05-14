import React, { Component } from 'react';
import './SearchBlock.css';
import SearchPost from './SearchPost/SearchPost';
import SearchGroup from './SearchGroup/SearchGroup';
import SearchUser from './SearchUser/SearchUser';
import SearchEvent from './SearchEvent/SearchEvent';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSearcherDataActionCreator, fetchSearcherData } from '../../store/Other/Actions';
import { loadGroupActionCreator } from '../../store/Groups/Actions';
import { redirectToOtherEventActionCreator } from '../../store/Events/Actions';
import OwnSpinner from '../UI/OwnSpinner/OwnSpinner';
import { apiPicturesUrl } from '../../axios/apiPicturesUrl';
import Man from '../../assets/img/empty_avatars/empty_avatar_man.jpg';
import Woman from '../../assets/img/empty_avatars/empty-avatar-girl.jpg';
import Aux from '../../hoc/Auxi';
import { validateInput } from '../../containers/UserOptions/Validation/Validation';


class SearchBlock  extends Component {
    state = {
        spinner: false,
        resultArray: [],
        counters: [
            {val: 0},
            {val: 0},
            {val: 0},
            {val: 0}
        ],
        startArray: [],
        clickedIconId: null,
        responseObject: null,
        validationError: ""

    }
    componentDidMount(){
        if(this.props.fetchedSearcherData.length === 0 || 
            this.props.searcherDataErrors.length > 0){
            const responseObject = JSON.parse(localStorage.getItem('responseObject'));
            this.setState({spinner: true, responseObject: responseObject});
            this.props.fetchSearcherData(responseObject.token);
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.fetchedSearcherData !== this.props.fetchedSearcherData || 
            nextProps.searcherDataErrors !== this.props.searcherDataErrors){
            this.setState({spinner: false});
        }
        if(nextProps.value !== "" && nextProps.fetchedSearcherData.events !== undefined){
            const validationResult = validateInput("", "", nextProps.value, "", "", "", "", "standard");
            if(validationResult !== ""){
                this.setState({validationError: validationResult});
            }
            

            else{
                const result = this.search(nextProps.value, nextProps.fetchedSearcherData);
                this.setState({resultArray: result[0], counters: result[1], 
                    startArray: this.connectArrays(result[0]), clickedIconId: null});
            }
                
            
            
            
            
        }
    }
    connectArrays = arrays => {
        const resultArray = [];
        for(let key in arrays){
            resultArray.push(arrays[key]);
        }
        return resultArray;
    }
    search = (value, dataToSearch) => {
        const newResultArray = [
            {name: "events", array: []},
            {name: "groups", array: []},
            {name: "posts", array: []},
            {name: "users", array: []}
        ];
        const counters = [
            {val: 0},
            {val: 0},
            {val: 0},
            {val: 0}
        ];
        const finalArray = [];
        newResultArray[0].array = dataToSearch.events;
        newResultArray[1].array = dataToSearch.groups;
        newResultArray[2].array = dataToSearch.posts;
        newResultArray[3].array = dataToSearch.users;
        for(let i = 0; i < newResultArray.length; i++){
            for(let j = 0; j < newResultArray[i].array.length; j++){
                const actualElement = newResultArray[i].array[j];
                if(i === 0){
                    if(actualElement.title.toLowerCase().search(value.toLowerCase()) !== -1){
                        finalArray.push({name: "events", array: actualElement});
                        counters[0].val++;
                    }
                }
                else if(i === 1){
                    if(actualElement.name.toLowerCase().search(value.toLowerCase()) !== -1){
                        finalArray.push({name: "groups", array: actualElement});
                        counters[1].val++;
                    }
                }
                else if(i === 2){
                    if(actualElement.title.toLowerCase().search(value.toLowerCase()) !== -1){
                        finalArray.push({name: "posts", array: actualElement});
                        counters[2].val++;
                    }
                }
                else if(i === 3){
                    if(actualElement.username.toLowerCase().search(value.toLowerCase()) !== -1){
                        finalArray.push({name: "users", array: actualElement});
                        counters[3].val++;
                    }
                }
            }
        }
        return [finalArray, counters];
    }

    filter = (name, id) => {
        const newArray = [...this.state.startArray];
        const resultArray = [];
        for(let key in newArray){
            if(newArray[key].name === name){
                resultArray.push(newArray[key]);
            }
        }
        this.setState({resultArray: resultArray, clickedIconId: id});
    }
    componentWillUnmount(){
        this.props.fetchSearcherDataToZero([],[]);
    }
    redirectToUsers = e => {
        this.props.close();
        this.props.history.push(`/logged/user/${e.target.id}`);
    }
    render() { 
        console.log(this.props.fetchedSearcherData);
        return ( 
            <div className={`search-block ${this.props.animClass}`}>
                {this.state.validationError === "" ? 
                <p className="result-icons">
                    <i onClick={ this.state.counters[0].val > 0 ? () => this.filter("events", 0) : null} 
                    className={`fa fa-calendar ${this.state.clickedIconId === 0 ? "more" : null} ${this.state.counters[0].val !== 0 ? 
                    "result-icons-active-event act" : null}`}></i>
                    <i onClick={ this.state.counters[1].val > 0 ? () => this.filter("groups", 1) : null} 
                    
                    className={`fa fa-users ${this.state.clickedIconId === 1 ? "more" : null} ${this.state.counters[1].val !== 0 ? 
                    "result-icons-active-group act" : null}`}></i>
                    <i onClick={ this.state.counters[2].val > 0 ? () => this.filter("posts", 2) : null} 
                    className={`fa fa-align-center ${this.state.clickedIconId === 2 ? "more" : null} ${this.state.counters[2].val !== 0 ? 
                    "result-icons-active-post act" : null}`}></i>

                    <i onClick={ this.state.counters[3].val > 0 ? () => this.filter("users", 3) : null}
                    className={`fa fa-user ${this.state.clickedIconId === 3 ? "more" : null}  ${this.state.counters[3].val !== 0 ? 
                    "result-icons-active-user act" : null}`}></i>
                </p> : null}
               
                

                <h3>Wyniki wyszukiwania </h3>
                

                <div className="search-block-content">
                    {this.state.validationError ? 
                    <p className="no-result">
                        {this.state.validationError}
                    </p> : 
                    
                    <Aux>
                        {this.state.spinner ? <OwnSpinner /> : 
                        this.props.searcherDataErrors.length > 0 ? 
                        <p className="no-result">
                            Wystapił błąd podczas ładowania danych. Spróbuj poźniej :/
                            <i className="fa fa-ban"></i>
                        </p> :
                        
                        this.state.resultArray.length > 0 ?
                        this.state.resultArray.map(i => {
                            return (
                            <Aux key={i.array.id + i.name}>
                                {i.name === "events" ? 
                                <SearchEvent 
                                    title={i.array.title}
                                    id={i.array.id}
                                    eventDate={i.array.eventDate}
                                    isInEvent={true}
                                    eventUsers={i.array.eventUsers}
                                    picture={i.array.picture}
                                    Man={Man}
                                    redirectToEvents={() => {this.props.redirectToOtherEvent(i.array.id, this.props.history); this.props.close();}}
                                    apiPicturesUrl={apiPicturesUrl}
                                    Woman={Woman}
                                    redirectToUsers={e => this.redirectToUsers(e)}
                                    responseObjectId={this.state.responseObject.id}
                                    /> 
                                :
                                i.name === "posts" ? 
                                <SearchPost 
                                title={i.array.title}
                                id={i.array.id}
                                pictures={i.array.pictures}
                                content={i.array.content}
                                apiPicturesUrl={apiPicturesUrl}
                                creationDate={i.array.creationDate}
                                author={i.array.author}
                                comments={i.array.comments}
                                Man={Man}
                                Woman={Woman}
                                redirectToUser={e => this.redirectToUsers(e)}
                                /> :
                                
                                i.name === "users" ? 
                                <SearchUser 
                                redirectTo={() => {this.props.history.push(`/logged/user/${i.array.id}`); this.props.close();}}
                                Man={Man}
                                id={i.array.id}
                                Woman={Woman}
                                apiPicturesUrl={apiPicturesUrl}
                                username={i.array.username}
                                picture={i.array.profilePicture}
                                sex={i.array.sex}
                                email={i.email}
                                birthDate={i.array.birthDate}
                                /> : 
                                <SearchGroup 
                                item={i.array} 
                                responseObjectId={this.state.responseObject.id}
                                Man={Man}
                                redirectToUser={e => this.redirectToUsers(e)}
                                Woman={Woman}
                                apiPicturesUrl={apiPicturesUrl}
                                redirectToGroup={() => {this.props.loadGroup(i.array.id, this.props.history);
                                    this.props.close();}}
                                /> }
                            </Aux>
                            );
                        }) : <p className="no-result">
                            Nic nie znalazłem<i className="fa fa-ban"></i>
                        </p>
                        }
                    </Aux>
                    
                    }    
                   
                </div>


                <div className="searcher-footer">
                    <b className="counter-of-found">
                        {this.state.validationError !== "" ? 0 : this.state.resultArray.length}
                    </b>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        fetchedSearcherData: state.OtherReducer.fetchedSearcherData,
        searcherDataErrors: state.OtherReducer.searcherDataErrors
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSearcherData: (token) => dispatch(fetchSearcherDataActionCreator(token)),
        fetchSearcherDataToZero: (result, errors) => dispatch(fetchSearcherData(result, errors)),
        loadGroup: (groupId, history) => dispatch(loadGroupActionCreator(groupId, history)),
        redirectToOtherEvent: (eventId, history) => dispatch(redirectToOtherEventActionCreator(eventId, history))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBlock));
