import React, {Component} from 'react';
import './WholeBlock.css';
import Aux from '../../hoc/Auxi';
import OptionBlock from './OptionBlock/OptionBlock';
import axios from 'axios/axios-groupsconnects';
import Spinner from 'components/UI/Spinner/Spinner';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'moment/locale/pl'
import 'react-datepicker/dist/react-datepicker.css';

import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import Button from 'components/UI/Button';

class wholeBlock extends Component{
    state = {
            userDetailsList: null,
            editAccountDetailsToogle: false,
            loading: false,
            loggingObject: null,
            error: false,
            avatarDeleted: false
    };


    componentDidMount(){
        const loggingObject = (
            JSON.parse(localStorage.getItem('responseObject')) !== null ? 
            JSON.parse(localStorage.getItem('responseObject')) :
            this.props.loggingObject
        );
        this.setState({loggingObject: loggingObject});

        if(loggingObject !== null){
            axios.get( '/api/users/' + loggingObject.id )
                .then( response => {
                    console.log(response.data);
                    const WholeItems = [ 
                        {id: 1, name: "Imię", value: response.data.firstName},
                        {id: 2, name: "Nazwisko", value: response.data.lastName},
                        {id: 3, name: "Nazwa użytkownika", value: response.data.username},
                        {id: 4, name: "Adres email", value: response.data.email},
                        {id: 5, name: "Data urodzenia", value: response.data.birthDate},
                        {id: 6, name: "Płec", value: response.data.sex}            
                    ];
                    this.setState({ userDetailsList: WholeItems })
                } )
                //TODO
                //dodac obsluge blędu
                .catch( err => {
                    console.log(err);
                } );
        }
    }

    deleteAvatarHandler = () =>{
        let config = {
            headers: {'Authorization': "bearer " + JSON.parse(localStorage.getItem('responseObject')).token}
        }

            axios.delete('/api/account/picture', config)
            .then((response)=>{
                console.log(response.data);
                setTimeout( () => {
                    window.location.reload();
                }, 2000);

                this.setState({avatarDeleted: !this.state.avatarDeleted});
            })
            .catch((error)=>{
                console.log(error.response);
            })
        
    }

    editAccountDetails = () => {
        this.setState({editAccountDetailsToogle: !this.state.editAccountDetailsToogle});
    }

    saveAccountDetails = (event) => {
        event.preventDefault();
        this.setState( { loading: true } );

        let config = {
            headers: {'Authorization': "bearer " + this.state.loggingObject.token}
        };
        console.log(this.state.userDetailsList[0]);
        console.log(this.state.userDetailsList[0].value);
        
        let data = {
            FirstName: this.state.userDetailsList[0].value.trim(),
            LastName: this.state.userDetailsList[1].value.trim(),
            Email: this.state.userDetailsList[3].value.trim(),
            BirthDate: this.state.userDetailsList[4].value,
            Sex: this.state.userDetailsList[5].value
        }
        
        axios.post("/api/account/updatedata", data, config)
            .then( response => {
                console.log(response);
                this.setState({editAccountDetailsToogle: false, loading: false, error: false});
            })
            .catch( error => {
                console.log(error);
                console.log(error.response);               

                this.setState({loading: false, error: true});
            })
        
    }

    changeInputValue = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.userDetailsList
        };

        const updatedFormElement = { 
            ...updatedForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;

        updatedForm[inputIdentifier] = updatedFormElement;
        console.log(updatedForm[inputIdentifier])
        console.log(updatedForm);
        this.setState({userDetailsList: updatedForm});

    }
    handleChange = (date) => {
        const updatedForm = {
            ...this.state.userDetailsList
        };

        const updatedFormElement = { 
            ...updatedForm[4]
        };

        updatedFormElement.value = date.format();

        updatedForm[4] = updatedFormElement;
        this.setState({userDetailsList: updatedForm});
      }

    _onSelect = (event) => {
        const updatedForm = {
            ...this.state.userDetailsList
        };

        const updatedFormElement = { 
            ...updatedForm[5]
        };

        updatedFormElement.value = event.value;
        
        updatedForm[5] = updatedFormElement;

        this.setState({userDetailsList: updatedForm});
        
        // setTimeout(() => {
        //     console.log("Po ",this.state.userDetailsList[5]);
        //   }, 100);
    }
    render(){
        moment.locale('pl');
        console.log(this.state.avatarDeleted);
        let topContent = (
            <Aux>
                <OptionBlock number="1" title="Wyglad" icon="fa fa-image" function="Zmień zdjęcie profilowe" shortContent="Zmień swoje zdjęcie profilowe, tak aby budzić respekt wsród płci przeciwnej." />
                {(this.state.avatarDeleted)? <p style={{color: 'green'}}>Usunięto avatar</p>:null}
                <Button clicked={this.deleteAvatarHandler} title="Usuń avatar"/>
            </Aux>
        )
        let errorsFromBackend = (this.state.error) ? (
            <p style={{color: "red"}}>Błędy w formularzu!</p>
        ): null;

        const options = [
            { value: false, label: 'Mężczyzna'},
            { value: true, label: 'Kobieta'}           
          ]
        let defaultOption = null

        if(this.state.userDetailsList !== null){
           defaultOption = options[(this.state.userDetailsList[5].value)? 1:0 ];
        }

        let Content = null;
        const formElementsArray = [];
        for (let key in this.state.userDetailsList) {
            formElementsArray.push({
                id: key,
                config: this.state.userDetailsList[key]
            });
        }

        switch(this.props.itemNumber){
            case 1:
                Content = (this.state.userDetailsList !== null && this.state.userDetailsList !== undefined)? 
                (!this.state.editAccountDetailsToogle)?
                (
                    <Aux>
                        {topContent}
                        <ul className="WholeBlock">
                            {formElementsArray.map(item => {
                            return (
                                <li key={item.id}>
                                    <b style={{fontWeight: 'initial', textAlign: 'left'}}>
                                            {item.config.name}
                                    </b> 
                                {(item.config.id === 5)?
                                (
                                    <b>
                                        {(moment().diff(item.config.value, 'years') > 100)? "Brak" : moment(item.config.value).format('LL')}
                                    </b>
                                )
                                :
                                (
                                    (item.config.id === 6)?
                                    (
                                        <b>
                                            {(item.config.value)? "Kobieta": "Mężczyzna"}
                                        </b>
                                    )
                                    :
                                    (
                                    <b>
                                        {(item.config.value === null || item.config.value === undefined) ? "Brak" : item.config.value}
                                    </b>
                                    )
                                    
                                )
                                }
                                </li>
                            );
                            })}
                        </ul>
                        <Button clicked={this.editAccountDetails} title="Edytuj dane konta"/>
                    </Aux>
                ):
                (
                    <Aux>
                        {!(this.state.loading)
                        ?
                        (
                            <Aux>
                                {topContent}
                                
                            <form style={{width: '100%'}}>
                                <ul className="WholeBlock">
                                    {formElementsArray.map(item => {
                                    return (
                                    <li key={item.id}>
                                        <b style={{fontWeight: 'initial', textAlign: 'left'}}>
                                                {item.config.name}
                                        </b> 
                                        {(item.config.id === 3)?(
                                            <b>{item.config.value}</b>
                                        )
                                        :
                                        (
                                            (item.config.id === 5)?(
                                                <DatePicker
                                                    // selected={this.state.startDate}
                                                    minDate={moment().subtract(100, 'year')}
                                                    scrollableYearDropdown
                                                    fixedHeight
                                                    placeholderText="Kliknij"
                                                    withPortal
                                                    showYearDropdown
                                                    maxDate={moment()}
                                                    selected={(moment().diff(this.state.userDetailsList[4].value, 'years') > 100)? moment() : moment(this.state.userDetailsList[4].value)}      
                                                                                                  
                                                    onChange={this.handleChange}
                                                />
                                            )
                                            :
                                            (
                                                (item.config.id === 6)?(
                                                    <Dropdown options={options} onChange={(event) => this._onSelect(event)} value={defaultOption} placeholder="Wybierz" />
                                                )
                                                :
                                                (
                                                    <input 
                                                    value={(item.config.value === null || item.config.value === undefined) ? "" : item.config.value}
                                                    onChange={(event) => this.changeInputValue(event, item.id)}
                                                />
                                                )
                                               
                                            )
                                        )
                                    }
                                    </li>
                                );
                                })}
                                </ul>
                            </form>
                            <b onClick={this.saveAccountDetails}>Zapisz dane konta</b>
                            <b onClick={this.editAccountDetails}>Anuluj</b>
                            </Aux>
                        )
                        :
                        (
                            <Spinner/>
                        )}
                        
                    </Aux>
                )
                :
                (
                    <Spinner/>
                );
                break;
            case 2:
                Content = (
                    <div className="WholeBlock">
                        <OptionBlock number="2" title="Uwierzytelnianie" icon="fa fa-key" function="Zmień hasło" shortContent="Pamiętaj, aby twoje hasło było unikalne i o odpowiedniej złożoności."/>
                        <OptionBlock number="3" title="Operacje na koncie" icon="fa fa-trash" function="Usuń konto" shortContent="Zanim usuniesz konto zastanów się. Nie będzie go można przywrócić"/>
    
                    </div>
                );
                break;
            case 3:
                Content = (
                    <div className="WholeBlock">
                        <OptionBlock title="Twoje grupy" icon="fa fa-users" function="Edytuj grupy" shortContent="Z poziomu tego panelu mozesz odejsc, badz usunac grupy, ktorych jestes zalozycielem" />    
                        <OptionBlock title="Wydarzenia" icon="fa fa-calendar" function="Edytuj wydarzenia" shortContent="Kazdy popelnia kiedy bledy. Przegladaj wydarzenia, ktorych jestes tworca i anuluj je w razie potrzeby" />    
                        <OptionBlock title="Twoje posty" icon="fa fa-clipboard" function="Edytuj posty" shortContent="Stworzyles post, ktory nie jest popularny? Usun go i daj odpoczac naszym administratorom" />    
    
                    </div>
                );    
            break;
            default:
                Content = (
                    <p>Error</p>
                )
        }

        return((<Aux>{errorsFromBackend}{Content}</Aux>)
    );
}
}
export default wholeBlock;
