import React from 'react';
import Logo from '../../components/Logo/Logo';
import LogoIcon from '../../components/Logo/LogoIcon/LogoIcon';
import imgOne from '../../assets/img/about/icons/aroundTheWorld.png';
import imgTwo from '../../assets/img/about/icons/informationsExchange.png';
import imgThree from '../../assets/img/about/icons/aroundTheWorld2.png';
import './About.css';
import FontAwesome from 'react-fontawesome';
import '../../assets/css/buttonStyles/shiningButton.css';
import { Link } from 'react-router-dom';
import '../../assets/css/font-awesome-animation.css';
import Footer from 'components/Footer/Footer';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const about = () => {
  return (
    <div id="AboutContent" className="container-fluid" style={{padding: "0"}}>
      <Row>
        <Col xs="12" sm="12" className="headerTop">
            <LogoIcon width="100px" />
            <Logo class="img-fluid"/>
            <h1>Ludzie z pasją!</h1>
        </Col>
      </Row>
      
    <Row className="interestsTop">
      <div>
          <h1>Wspólne Zainteresowania</h1>
            <div className="separatedLine">
            </div>
      </div>
    </Row>

    <Row className="fourElementsTop">
      <Col xs="12" md="4" className="firstElement">
        <div className="img1">
          <img src={imgOne} class="img-fluid"/>
        </div>

        <h4>Ludzie z całego Świata</h4>
        <p>Dzięki naszemu portalowi, Masz szansę nawiązać kontakt z ludźmi o podobnych zainteresowaniach z całego Świata.</p>
      </Col>

    <Col xs="12" md="4" className="firstElement">
        <div className="img1">
          <img src={imgTwo} class="img-fluid" />
        </div>

        <h4>Wymiana informacji</h4>
        <p>Informację w naszym poraltu możesz wymieniać na bierząco z innymi rozmówcami.</p>
    </Col>
      
      <Col xs="12" md="4" className="firstElement">
        <div className="img1">
          <img src={imgThree} class="img-fluid" />
        </div>

        <h4>Organizuj spotkania</h4>
        <p>Jak dobrze wiadomo, najlepiej rozmiawia się face-face. Sprawdź kalendarz i utwórz wydarzenie!</p>
      </Col>

    </Row>

      <Row className="peopleTop">
        <div>
          <h1>Współpraca</h1>
          <div className="separatedLine">
          </div>
        </div>
      </Row>
      
      <div className="beforeFooter">
        <Container >
          <Row>
            <Col sm="7" xs="12">
              <h3>Dołącz do nas już dziś!</h3>
            </Col>
            <Col sm="5" xs="12">
              <Link to="/register"><button className="createAccount">Załóź konto!</button></Link>
            </Col>
          </Row>
        </Container>
      </div>
    
      <Footer/>
    </div>
  );
}

export default about;