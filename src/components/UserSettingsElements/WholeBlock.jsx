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

class wholeBlock extends Component{
    state = {
            userDetailsList: null,
            editAccountDetailsToogle: false,
            loading: false,
            loggingObject: null,
            startDate: moment()
    };
    
    componentDidMount(){
        const loggingObject = (
            JSON.parse(localStorage.getItem('responseObject')) !== null ? 
            JSON.parse(localStorage.getItem('responseObject')) :
            this.props.loggingObject
        );
        this.setState({loggingObject: loggingObject});
        console.log(loggingObject);

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
                        {id: 6, name: "Płec", value: response.data.sex ? "Mężczyzna" : "Kobieta"}            
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
            FirstName: this.state.userDetailsList[0].value,
            LastName: this.state.userDetailsList[1].value,
            Email: this.state.userDetailsList[3].value,
            BirthDate: this.state.userDetailsList[4].value,
            // Sex: this.state.userDetailsList[5].value
            Sex: true
        }
        
        axios.post("/api/account/updatedata", data, config)
            .then( response => {
                console.log(response);
                this.setState({editAccountDetailsToogle: false, loading: false});
            })
            .catch( error => {
                console.log(error);
                console.log(error.response);
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
    render(){
        moment.locale('pl');
        if(this.state.userDetailsList !== null){
            console.log(new Date(this.state.userDetailsList[4].value));
            console.log(moment(this.state.userDetailsList[4].value));
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
                        <OptionBlock title="Wyglad" icon="fa fa-image" function="Zmień zdjęcie profilowe" shortContent="Zmień swoje zdjęcie profilowe, tak aby budzić respekt wsród płci przeciwnej." />
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
                                        {moment(item.config.value).format('LL')}
                                    </b>
                                )
                                :
                                (
                                    <b>
                                        {(item.config.value === null || item.config.value === undefined) ? "Brak" : item.config.value}
                                    </b>
                                )
                                }
                                </li>
                            );
                            })}
                        </ul>
                        <b onClick={this.editAccountDetails}>Edytuj dane konta</b>
                    </Aux>
                ):
                (
                    <Aux>
                        <OptionBlock title="Wyglad" icon="fa fa-image" function="Zmień zdjęcie profilowe" shortContent="Zmień swoje zdjęcie profilowe, tak aby budzić respekt wsród płci przeciwnej." />
                        
                        {!(this.state.loading)
                        ?
                        (
                            <Aux>
                            <form>
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
                                                    selected={moment(this.state.userDetailsList[4].value)}                                                    
                                                    onChange={this.handleChange}
                                                />
                                            )
                                            :
                                            (
                                                <input 
                                                    value={(item.config.value === null || item.config.value === undefined) ? "" : item.config.value}
                                                    onChange={(event) => this.changeInputValue(event, item.id)}
                                                />
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
                        <OptionBlock title="Uwierzytelnianie" icon="fa fa-key" function="Zmien haslo" shortContent="Pamietaj, aby twoje haslo bylo unikalne i o odpowiedniej mocy"/>
                        <OptionBlock title="Operacje na koncie" icon="fa fa-trash" function="Usuń konto" shortContent="Zanim usuniesz konto zastanow sie. Nie mozna go przywrocic"/>
    
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

        return((<Aux>{Content}</Aux>)
    );
}
}
export default wholeBlock;
