import React, { Component } from 'react';
import './UserSettings.css';
import WholeBlock from '../../../components/UserSettingsElements/WholeBlock';
import { connect } from 'react-redux';

class UserSettings extends Component{
    state = { 
        choosenId: 1,
        wholeItems : []

    }
    componentDidMount(){
        const loggingObject = (
            JSON.parse(localStorage.getItem('responseObject')) !== null ? 
            JSON.parse(localStorage.getItem('responseObject')) :
            this.props.loggingObject
        );
        const WholeItems = [ // Pamietac zeby dodac do value dane z serwera potem
            {id: 1, name: "Imię", value: loggingObject.firstName, option: "Edytuj"},
            {id: 2, name: "Nazwisko", value: loggingObject.LastName, option: "Edytuj"},
            {id: 3, name: "Nazwa użytkownika", value: loggingObject.username, option: "Edytuj"},
            {id: 4, name: "Adres email", value: loggingObject.email, option: "Edytuj"},
            {id: 5, name: "Data urodzenia", value: loggingObject.birthDate, option: "Edytuj"},
            {id: 6, name: "Płec", value: loggingObject.sex ? 
            "Mężczyzna" : "Kobieta", option: "Edytuj"}            
        ];
        this.setState({ wholeItems: WholeItems })
    }
    changingChoosenBlock = (id) => { this.setState({choosenId: id}); }

    render(){
        let Content = null;
        
        const UserSettings = [
            {id: 1, name: "Ogólne"},
            {id: 2, name: "Bezpieczeństwo"},
            {id: 3, name: "Społeczności"}
        ];
        return (
            <div className="UserSettings">
                <div className="UserSettingsBlock">
                    <h2 style={{marginTop: '30px'}}>Opcje użytkownika</h2>
                    <ul className="NavList">
                        {UserSettings.map(item => {
                            return <li className={item.id === this.state.choosenId ? "Active" : ""} key={item.id} onClick={() => this.changingChoosenBlock(item.id)}>{item.name}</li>
                        })}
                      
                    </ul>
                    <WholeBlock
                     wholeItems={this.state.wholeItems}
                     itemNumber={this.state.choosenId}
                     loggingObject={this.props.loggingObject} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { loggingObject: state.logRed.loggingObject };
}
export default connect(mapStateToProps, null)(UserSettings);
