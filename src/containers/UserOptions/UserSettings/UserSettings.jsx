import React, { Component } from 'react';
import './UserSettings.css';
import WholeBlock from '../../../components/UserSettingsElements/WholeBlock';


class UserSettings extends Component{
    state = { choosenId: 1 }
    changingChoosenBlock = (id) => { this.setState({choosenId: id}); }

    render(){
        let Content = null;
        const WholeItems = [ // Pamietac zeby dodac do value dane z serwera potem
            {id: 1, name: "Imie i nazwisko", value: null, option: "Edytuj"},
            {id: 2, name: "Nazwa użytkownika", value: null, option: "Edytuj"},
            {id: 3, name: "Adres email", value: null, option: "Edytuj"},
            {id: 4, name: "Data urodzenia", value: null, option: "Edytuj"},
            {id: 5, name: "Płec", value: null, option: "Edytuj"}            
        ];
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
                    <WholeBlock wholeItems={WholeItems} itemNumber={this.state.choosenId} />
                </div>
            </div>
        );
    }
}

export default UserSettings;