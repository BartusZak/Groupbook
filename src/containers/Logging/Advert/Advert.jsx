import React from 'react';
import {Link} from 'react-router-dom';

import './Advert.css';
import Aux from '../../../hoc/Auxi';
// import {Carousel,} from 'reactstrap';
import Carousel from 'nuka-carousel';

import billeniumLogo from '../../../assets/img/homePage/billennium.png';
import uwmLogo from '../../../assets/img/homePage/uwmLogo.png';


const advert = (props) => {
  return (
        <div className="AdvertDiv">
            <h4>Wspierają nas</h4>
            <Carousel autoplay="true" autoplayInterval="5000" cellAlign="left">
              <img src={billeniumLogo}/>
              <img src={uwmLogo}/>
            </Carousel>
            
        </div>
  );
}

export default advert;


// import React from 'react';

// import './Advert.css';
// import Aux from '../../../hoc/Auxi';
// import {Carousel, CarouselItem, CarouselCaption} from 'reactstrap';

// import billeniumLogo from '../../../assets/img/homePage/billennium.png';
// import uwmLogo from '../../../assets/img/homePage/uwmLogo.png';


// const advert = (props) => {
//   return (
//         <Carousel>
//           <CarouselItem>
//             <img width={900} height={500} alt="900x500" src={billeniumLogo} />
//             <CarouselCaption>
//               <h3>First slide label</h3>
//               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//             </CarouselCaption>
//           </CarouselItem>
//         </Carousel>
//   );
// }

// export default advert;