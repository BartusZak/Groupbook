import React, { Component } from 'react';
import './UserSettings.css';
import WholeBlock from '../../../components/UserSettingsElements/WholeBlock';
import { connect } from 'react-redux';

class UserSettings extends Component{
    state = { 
        choosenId: 1,
        error: false

    }
    
    changingChoosenBlock = (id) => { this.setState({choosenId: id}); }

    render(){
        const errorContent = <p>Błąd poczas nawiązywania połączenia z serwerem</p>;

        const UserSettings = [
            {id: 1, name: "Ogólne"},
            {id: 2, name: "Bezpieczeństwo"},
            {id: 3, name: "Społeczności"}
        ];
        return (
            (this.state.error)? 
                {errorContent} 
            :
                (
                    <div className="UserSettings">
                        <div className="UserSettingsBlock">
                            <h2 style={{marginTop: '30px'}}>Opcje użytkownika</h2>
                            <ul className="NavList">
                                {UserSettings.map(item => {
                                    return <li className={item.id === this.state.choosenId ? "Active" : ""} key={item.id} onClick={() => this.changingChoosenBlock(item.id)}>{item.name}</li>
                                })}
                            </ul>
                            <WholeBlock
                            itemNumber={this.state.choosenId}
                            loggingObject={this.props.loggingObject} />
                        </div>
                    </div>
                )
        );
    }
}

const mapStateToProps = state => {
    return { loggingObject: state.logRed.loggingObject };
}
export default connect(mapStateToProps, null)(UserSettings);
