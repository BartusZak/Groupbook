import React,  {Component, PropTypes} from 'react';
import {Container} from '../../theme/grid.jsx';
import {
    Image,
    DevImage,
    RevealPLeft,
    RevealPRight,
    ImageContainer,
    FlexRow,
    TextContainer,
    TextContainer2,
    QuoteSpan,
    QuoteSpan2
} from './Team.style';
import WhenInView from 'components/WhenInView/WhenInView';

import ParallaxImage from 'react-image-parallax2';
import Footer from 'components/Footer/Footer';
import Aux from 'hoc/Auxi';


export default class Home extends Component {
    static propTypes = {};

    render() {
        return (
        <div style={{display: "flex",flexWrap: "wrap", backgroundColor: 'white'}}>
            <Container>
               
                <DevImage>
                    <h1>Nasi Developerzy</h1>
                </DevImage>
                {/* <Image src={require('../../assets/img/team/ourDevelopers.jpg')} alt="Nasi developerzy"/> */}
                
                <FlexRow style={{textAlign: 'center', padding:"50px 0"}}>
                    <QuoteSpan>”<i>Zawsze pisz kod tak, jakby gość, który ma się nim zajmować był agresywnym psychopatą,</i></QuoteSpan>
                    <QuoteSpan2><i>który wie, gdzie mieszkasz</i>” – <b>Martin Golding</b></QuoteSpan2>
                </FlexRow>

                <FlexRow>
                <ImageContainer>
                    <ParallaxImage
                        reduceHeight={1/3}
                        width="200px"
                        src="https://scontent.fwaw5-1.fna.fbcdn.net/v/t1.0-9/14479640_732821196874144_4059796500749173148_n.jpg?_nc_eui2=v1%3AAeEZkfg5HC2YDLx_3cghv0BQdJ6q2cV0y1x0gpQEBGcktoelF8kxHNDJdh6J04e30Dn39s9Jez7Qx02G-7FwFO6WCXrX_EvyKtNKrsNE0U2Neg&oh=f5b6563ac7e5c74a01e58476b8e743e2&oe=5B3B7899">
                    </ParallaxImage>
                </ImageContainer>
                <TextContainer>
                    <h1>Adrian Połubiński</h1>
                    <span>GroupConnects Dev Team Leader</span>
                    <WhenInView>
                        {({ isInView }) =>
                            <RevealPLeft hide={!isInView}>
                                Adrian został porzucony po narodzinach. W przytułku dla małoletnich developerów w Nowym Jorku, został odnaleziony przez programistę z Warszawy. Razem z nim wrócił do Polski. Tutaj znalazł dom i ciepło w programistycznej rodzienie. 
                                Tata - Andrzej - Senior Back End developer (jeden z założycieli portalu Nasza-klasa). Mama - Katarzyna - również Back End Developer. Rodzicie byli zadowoleni ze swojego syna, który kontynuował odwieczną tradycję bycia Back End Developerem.
                                Po wielu latach programowania Back End'u, zgłębiania zagadnień wzorca programowania MVC, kiedy Adrian (właściwie August) dorósł, dowiedział się, że jest synem Mark'a Zuckerberg'a oraz Priscilli Chan.  
                                Wtedy jego życie zmieniło się diametralnie. Postanowił porzucić dotychczasowy tryb życia i zająć się czymś innym. I w taki sposób powstał portal GroupsConnects. Adrian w niecałe pół roku z Back End Dev stał się Front End Dev (czyt. Full Stack Dev).
                            </RevealPLeft>
                        }
                    </WhenInView>

                </TextContainer>
                </FlexRow>

                <FlexRow>
                <TextContainer2>
                    <h1>Bartłomiej Płoszyński</h1>
                    <span>GroupConnects Developer</span>
                    <WhenInView>
                        {({ isInView }) =>
                            <RevealPRight hide={!isInView}>
                                Siedzi 20 godzin dziennie przed komputerem, wpisuje 10 słów na sekundę, zna Pascal, BASIC, Assembler, Fortran, Logo, APL, Algol, Prolog, wytrzymuje 230V i zna wszystkie książki. Bartłomiej lubi nazywać siebię "urządzeniem peryferyjnym" przetwarzającym kawę, soczek, tonik, pepsi, colę oraz hektolitry napoju energetycznego w linie kodu źródłowego. 
                                Jest jedynym znanym stworzeniem, które potrafi rozwiązać twój problem, o którym nie miałeś pojęcia, że istnieje, w sposób którego absolutnie nie zrozumiesz. Sam Bartłomiej uważa siebie za matematyka, a matematycy (jak to mają w zwyczaju) podniecają się pierścieniami, alefami zero, koniunkcyjnymi postaciami normalnymi formuły zdaniowej i innymi ciekawymi zagadnieniami matematyki teoretycznej, nazywając informatyków „matematykami inaczej” i cienkimi bolkami. Kocha marte
                            </RevealPRight>
                        }
                    </WhenInView>
                </TextContainer2>
                <ImageContainer>
                    <ParallaxImage
                        reduceHeight={1/4}
                        width="200px"
                        src="https://scontent.fwaw5-1.fna.fbcdn.net/v/t1.0-9/12923359_1057483807658251_7966071468295257215_n.jpg?_nc_eui2=v1%3AAeHd9nwVIyJrDZgQj11RxgIaamVudnDPjdmYUf8p3oZX5MggQGrV1Cw3j07Zw03HHAA03mqmPu_0SYtw3DDLyXuKYarYjsSLlHdGAZVe5DCP4A&oh=f1ac48a9e03489769c27d480a463cb1d&oe=5B4D481F">
                    </ParallaxImage>
                </ImageContainer>
                </FlexRow>

                <FlexRow>
                <ImageContainer>
                    <ParallaxImage
                        reduceHeight={1/3}
                        width="200px"
                        src="https://scontent.fwaw5-1.fna.fbcdn.net/v/t1.0-9/11738090_1679660898920626_5249364290534243150_n.jpg?_nc_eui2=v1%3AAeFtwoaXhnSgtlLeBX1nlqAW0JidFLUYEysCzunEG3UjvYHBBWjl-L2sgrgPeexIcHMn2Ww86IQpAmjKa5B73s6yWec9OmBhK4l_lOR8vBFXwA&oh=e3921b8c92e7944a5f4adcf11da39894&oe=5B371DF3">
                    </ParallaxImage>
                </ImageContainer>
                <TextContainer>
                    <h1>Adam Sobiecki</h1>
                    <span>GroupConnects Senior Analityk</span>
                    <WhenInView>
                        {({ isInView }) =>
                            <RevealPLeft hide={!isInView}>
                                Najczęściej analitykami zostają informatycy. Niektórzy mówią, że radzą sobie oni w tym zawodzie najlepiej. Adam to osoba, która miała do czynienia z programowaniem, algorytmami, sieciami, lepiej zrozumie, co mówią do niej programiści. Kiedy mija wiele lat, a technologia rozwija się jak szalona, to analityk-informatyk, mimo iż nie zna wszystkich języków programowania, środowisk programistycznych i mnożących się narzędzi wspierających wytwarzanie systemów, to jest w stanie zrozumieć stojące za nimi koncepcje. 
                                Zbierając wymagania, potrafi sobie wyobrazić, czego programista potrzebuje do pracy. Krążą plotki, że sam kiedyś programował. Potrafi też tak mówić do programistów, żeby przetłumaczyć biznesowy bełkot :) A żargon programistów tłumaczy zafrasowanym ludziom „nietechnicznym” na polski.
                            </RevealPLeft>
                        }
                    </WhenInView>
                </TextContainer>
                </FlexRow>

                  <FlexRow>
                <TextContainer2>
                    <h1>Radosław Szok</h1>
                    <span>-----</span>
                    <p>
                    ---
                    </p>
                </TextContainer2>
                <ImageContainer>
                    <ParallaxImage
                        reduceHeight={1/4}
                        width="200px"
                        src="http://creotech.pl/wp-content/uploads/2015/08/No-Avatar-High-Definition.jpg">
                    </ParallaxImage>
                </ImageContainer>
                </FlexRow>

                                <FlexRow>
                <ImageContainer>
                    <ParallaxImage
                        reduceHeight={1/3}
                        width="200px"
                        src="http://creotech.pl/wp-content/uploads/2015/08/No-Avatar-High-Definition.jpg">
                    </ParallaxImage>
                </ImageContainer>
                <TextContainer>
                    <h1>Radosław Stankiewicz</h1>
                    <span>---- </span>
                    <p>
                    -------
                    </p>
                </TextContainer>
                </FlexRow>

            <FlexRow>
                <TextContainer2>
                    <h1>Artur Węgrodzki</h1>
                    <span>-----</span>
                    <p>
                    ---
                    </p>
                </TextContainer2>
                <ImageContainer>
                    <ParallaxImage
                        reduceHeight={1/4}
                        width="200px"
                        src="http://creotech.pl/wp-content/uploads/2015/08/No-Avatar-High-Definition.jpg">
                    </ParallaxImage>
                </ImageContainer>
                </FlexRow>
            </Container>

            <Footer/>
        </div>
        );
    }
}