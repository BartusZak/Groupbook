import React from 'react';
import {Link} from 'react-router-dom';

import './Advert.css';
import Aux from '../../hoc/Auxi';



const advert = (props) => {
  return (
        <div className="AdvertDiv">
            <h1>Reklama</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at quam ullamcorper, accumsan magna id, cursus justo. Etiam interdum ligula id dapibus sollicitudin. Integer a eros vitae mi auctor tincidunt eget ac sapien. In ac interdum urna. Mauris aliquet lectus ac ultricies vulputate. Ut et diam cursus, molestie ex sed, tristique augue. Mauris auctor ligula non vulputate tristique. Integer leo erat, pellentesque ultrices lobortis nec, porta vitae lorem. Fusce ultricies felis luctus lectus tristique feugiat. Praesent risus enim, ultricies non auctor ac, vestibulum ac augue. Integer volutpat interdum leo, lobortis tristique tellus. </p>
        </div>
  );
}

export default advert;