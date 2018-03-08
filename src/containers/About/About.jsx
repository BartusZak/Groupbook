import React from 'react';
import Logo from '../../components/Logo/Logo';
import './About.css';

const about = () => {
  return (
    <div id="AboutContent">
      <div className="headerTop">
        <Logo />
        <h1>To Ludzie</h1>
      </div>

      <div className="peopleTop">
        Współpraca
      </div>
    </div>
  );
}

export default about;