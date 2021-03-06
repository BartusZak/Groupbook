import React from 'react';
import { Footer } from './Footer.style';
import {Link} from 'react-router-dom';
import {Row, Col} from 'reactstrap';

const footer = () => {

    return(
    <Footer className="footer-copyright py-3 text-center">
        <Row>
            <Col className="MenuFooter" xs="12" md="12" lg="8">    
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Rejestracja</Link></li>
                        <li><Link to="/logging">Zaloguj</Link></li>
                        <li><Link to="/about">O nas</Link></li>
                        <li><Link to="/privatypolicy">Polityka Prywatności</Link></li>
                        <li><Link to="/carier">Kariera</Link></li>
                        <li><Link to="/contact">Kontakt</Link></li>
                        <li><Link to="/help">Pomoc</Link></li>
                    </ul>
            </Col>
            <Col xs="12" md="12" lg="4" >
                © 2018 Copyright:&nbsp; 
                <a href="http://bartuszak.pl">bartuszak</a>,&nbsp; 
                <a href="https://www.facebook.com/profile.php?id=100004388103426polubis">polubis</a>
            </Col>
        </Row>
    </Footer>

    );
};

export default footer;