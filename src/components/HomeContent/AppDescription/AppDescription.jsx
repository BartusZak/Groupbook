import React from 'react';
import './AppDescription.css';
import handsUpPpl from '../../../assets/img/homePage/handsUpPpl.png';
import Typist from 'react-typist';
import TypistLoop from 'react-typist-loop'

class appDescription  extends React.Component {
    state = {
        renderMsg: false,
      }
    
      onHeaderTyped = () => {
        this.setState({ renderMsg: true });
      }
    
      render() {

    return(
        <div className="AppDescription">
          <div>
            <h4>Szukasz ludzi o podobnych zainteresowaniach?</h4>
            <h5>Załóż konto i&nbsp; 
              <TypistLoop interval={0} >
                {[
                  'poznaj innych użytkowników!',
                  'dołącz do interesującej Cię grupy!',
                  'stwórz własną grupę zainteresowań!',
                  'oragnizuj cykliczne spotkania!',
                ].map(text => <Typist className="inlineTypist" key={text} startDelay={0}>{text}<Typist.Delay ms={3500} /><Typist.Backspace count={50} delay={100} /></Typist>)}
              </TypistLoop>
            </h5>
          </div>
        </div>
    );
}
}
export default appDescription;
