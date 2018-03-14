import styled, {css} from 'styled-components';

export const QuoteSpan = styled.span`
    margin-right: 250px;
`;

export const QuoteSpan2 = styled.span`
    display: block;
    margin-left: 313px;
`;

export const Image = styled.img`
    width: 50%;
    `;

export const DevImage = styled.div`
    height: 100vh;
    width: 100%;
    background-image: url('${require('assets/img/team/ourDevelopers.jpg')}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;

    font-family: 'Roboto', sans-serif;
    text-align: center;
    font-size: 2em;
    color: white;
    text-transform: uppercase;

    h1{
        margin-bottom: 0;
    }
    `;

    export const RevealPLeft = styled.p`
    position: relative;
    &:after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    //   background: -webkit-linear-gradient(to right,#00924c,#004b2f);
    //   background: -webkit-gradient(linear,left top, right top,from(#004b2f),to(#00924c));
    //   background: -webkit-linear-gradient(left,#004b2f,#00924c);
    //   background: -o-linear-gradient(left,#004b2f,#00924c);
    //   background: linear-gradient(to right,#004b2f,#00924c);
        background: black;
      transform-origin: left;
      transform: rotateY(90deg);
      transition: transform 2s;
      opacity: 0.9;
    }
    ${({ hide }) => hide && css`
      &:after {
        transform: rotateY(0deg);
      }
    `}
  `;

  export const RevealPRight = styled.p`
  position: relative;
  &:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  //   background: -webkit-linear-gradient(to right,#00924c,#004b2f);
  //   background: -webkit-gradient(linear,left top, right top,from(#004b2f),to(#00924c));
  //   background: -webkit-linear-gradient(left,#004b2f,#00924c);
  //   background: -o-linear-gradient(left,#004b2f,#00924c);
  //   background: linear-gradient(to right,#004b2f,#00924c);
      background: black;
    transform-origin: right;
    transform: rotateY(90deg);
    transition: transform 2s;
    opacity: 0.9;
  }
  ${({ hide }) => hide && css`
    &:after {
      transform: rotateY(0deg);
    }
  `}
`;

  export const ImageContainer = styled.div`
    width: 20%;
    display: inline-block;
    `;

    export const FlexRow = styled.div`
      width: 100%;
    `;

    
    export const TextContainer = styled.div`
    width: 80%;
    display: inline-block;
    padding-left: 20px;
    h1 {
        margin: 0;
    }
    span {
        margin-bottom: 10px;
        display: inline-block;
    }
    p {
        text-align: justify;
    }
  `;

  export const TextContainer2 = styled.div`
  width: 80%;
  display: inline-block;
  padding: 50px 20px 50px 0px;
  h1 {
      margin: 0;
      text-align: right;
  }
  span {
      margin-bottom: 10px;
      display: block;
      text-align: right;
  }
  p {
    text-align: justify;
}
`;