import React from 'react';
import './WholeBlock.css';
import Aux from '../../hoc/Auxi';
import OptionBlock from './OptionBlock/OptionBlock';


const wholeBlock = (props) => {
    let userDetailsList = [...props.wholeItems];
    let Content = null;
    switch(props.itemNumber){
        case 1:
            Content = (
                <Aux>
                    <OptionBlock title="Wyglad" icon="fa fa-image" function="Zmień zdjęcie profilowe" shortContent="Zmień swoje zdjęcie profilowe, tak aby budzić respekt wsród płci przeciwnej." />
                    <ul className="WholeBlock">
                        {userDetailsList.map(item => {
                        return <li key={item.id}>
                        <b style={{fontWeight: 'initial', textAlign: 'left'}}>
                        {item.name}</b> 
                        <b>{(item.value === null || item.value === undefined) ? "Brak" : item.value}</b> 
                        <b className="Option">{item.option}</b>
                        </li>;
                        })}
                    </ul>
                </Aux>
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
    return(<Aux>{Content}</Aux>);
}
export default wholeBlock;
