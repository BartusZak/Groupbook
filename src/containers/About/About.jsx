import React from 'react';
import Logo from '../../components/Logo/Logo';
import imgOne from '../../assets/img/about/icons/aroundTheWorld.png';
import imgTwo from '../../assets/img/about/icons/informationsExchange.png';
import imgThree from '../../assets/img/about/icons/aroundTheWorld2.png';
import './About.css';

const about = () => {
  return (
    <div id="AboutContent">
      <div className="headerTop">
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
    </div>
  );
}

export default about;