import React from 'react';
import './Navbar.css';
import Items from './Items/Items';
const navbar = (props) => {

    const itemsBeforeLogIn = [
        {id: 1, name: "O nas"},
        {id: 2, name: "Rejestracja"},
        {id: 3, name: "Facebook"},
        {id: 4, name: "Twitter"}
    
    ]

    const itemsAfterLogIn = [
        {id: 1, name: "Siema"},
        {id: 2, name: "Rejestracja"},
        {id: 3, name: "Facebook"},
        {id: 4, name: "Twitter"}
    
    ]
 
    const result = props.result ? itemsAfterLogIn : itemsBeforeLogIn;
    return (
        
        <nav className="Navbar">
        
                <div>Logo</div>
                
                <Items items={result}/>
     
         
         
          
        </nav>
    );
}

export default navbar;