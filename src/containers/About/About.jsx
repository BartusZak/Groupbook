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

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

const about = () => {
  return (
    <div id="AboutContent">
      <div className="headerTop">
        <LogoIcon width="100px" />
        <Logo />
        <h1>To Ludzie</h1>
      </div>

      <div className="interestsTop">
        Wspólne Zainteresowania
        <div className="separatedLine">
        </div>
      </div>

    <div className="fourElementsTop">
      <div className="firstElement">
        <div className="img1">
          <img src={imgOne} />
        </div>

        <h4>Ludzie z całego Świata</h4>
        <p>Dzięki naszemu portalowi, Masz szansę nawiązać kontakt z ludźmi o podobnych zainteresowaniach z całego Świata.</p>
      </div>

    <div className="firstElement">
        <div className="img1">
          <img src={imgTwo} />
        </div>

        <h4>Wymiana informacji</h4>
        <p>Informację w naszym poraltu możesz wymieniać na bierząco z innymi rozmówcami.</p>
    </div>
      
      <div className="firstElement">
        <div className="img1">
          <img src={imgThree} />
        </div>

        <h4>Organizuj spotkania</h4>
        <p>Jak dobrze wiadomo, najlepiej rozmiawia się face-face. Sprawdź kalendarz i utwórz wydarzenie!</p>
      </div>

	  </div>

      <div className="peopleTop">
        Współpraca
        <div className="separatedLine">
        </div>
      </div>
      
      <div className="beforeFooter">
        <Container>
          <Row>
            <Col sm="7">
              <h3>Dołącz do nas już dziś!</h3>
            </Col>
            <Col sm="5">
              <Link to="/register"><button>Załóź konto!</button></Link>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="footer">
        <Container>
            <Row>
              <Col md="3" sm="6" xs="12">
                <Logo width={"100%"}/>

              </Col>
              <Col md="3" sm="6" xs="12">
                <h4>Menu</h4>
                <ul>
                  <li>Home</li>
                  <li>Polityka Prywatności</li>
                  <li>Kontakt</li>
                  <li>Social Media</li>
                  <li>info</li>   
                </ul>               
              </Col>
              <Col md="3" sm="6" xs="12">
                <h4>Aktulaności</h4>
              </Col>
              <Col md="3" sm="6" xs="12">
                <h4>Kontakt</h4>
                <ul className="contact">
                  <li> <FontAwesome
        className='faa-wrench animated'
        name='phone'

        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />    +48 000 000 000</li>
                  <li><FontAwesome
        className='faa-horizontal animated'
        name='envelope'
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />   kontakt@groupsconnects.pl</li>
                  
                  <li><FontAwesome
        className='faa-float animated'
        name='globe'
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />   www.groupsconnects.pl</li>
      </ul>
              </Col>
            </Row>
        </Container>
      </div>

      <div className="afterFooter">
        <Container>
          <Row>
            <p>
              Portal stworzony na porzeby zaliczenia przedmiotu "Projekt Zespołowy".<br/>
              Uniwersytet Warmińsko-Mazurski w Olsztynie<br/>
              Wydział Matematyki i Informatyki<br/>
              2017/2018
            </p>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default about;