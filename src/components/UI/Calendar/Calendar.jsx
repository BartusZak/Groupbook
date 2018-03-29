import React from 'react';
import './Calendar.css';


const days = ["Pn","Wt","Sr","Czw","Pt","Sb","Nd"];
//
const december = {
    id: "grudzień",
    start: 6,
    numberOfDays: 31,
    monthBeforeEndIndeks: 30,
    end: 6
}

const calendar = (props) => {
    let DaysNumbers = [];
    for(let i = (december.monthBeforeEndIndeks - december.start+2); i <= december.monthBeforeEndIndeks; i++){
        DaysNumbers.push({value: i, classy: "disable"});
    }
    for(let i = 1; i <= december.numberOfDays ; i++){
        DaysNumbers.push({value: i, classy: ""});
    }
    for(let i = 1; i <= december.end; i++){
        DaysNumbers.push({value: i, classy: "disable"});
    }
    return(
        <div className="calendar-elements-container" style={{opacity: props.showCalendar ? '1' : '0'}}>
        <section className="month" id="styczen">
            <h1>Grudzień 2018</h1>
            <article>
                <div className="days">
                    {days.map( day => { return <b key={day}>{day}</b> })}
                </div>                       
                <div className="dates">
                    {DaysNumbers.map( number => {
                        return (<span className={number.value === props.choosenDay ? 
                        "active" : number.classy} key={number.classy+number.value}>
                            {number.value}
                            </span>);
                    })}
                    
                </div>
                </article>        
        </section>
    </div>

       
    )

}

export default calendar;