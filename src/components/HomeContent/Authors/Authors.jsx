import React from 'react';
import './Authors.css';
import {Link} from 'react-router-dom';

const authors = () => {

    return(
        <div className="AuthorsDiv">
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/register">Rejestracja</Link></li>
                    <li><Link to="/">Zaloguj</Link></li>
                    <li><Link to="/about">O nas</Link></li>
                </ul>
            </div>

            <div>
                <ul>
                    <li><Link to="/privatypolicy">Polityka Prywatności</Link></li>
                    <li><Link to="/carier">Kariera</Link></li>
                    <li><Link to="/contact">Kontakt</Link></li>
                    <li><Link to="/help">Pomoc</Link></li>
                </ul>
            </div>

        </div>

    );
};

export default authors;