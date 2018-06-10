import React from 'react';
import './RodoPrompt.css';
import Aux from '../../../hoc/Auxi';
const rodoPrompt = props => (
    <Aux>
    <i onClick={props.exitChat} className="fa fa-times"></i>
                <h1>Witaj w naszym komunikatorze</h1>
                <div className="chat-caffels">
                    <div className="chat-caffel">
                        <i className="fa fa-comments"></i>
                        <h2>RODO ?</h2>
                        <article>
                            Z powodu wprowadzenia ustawy 
                            masz możliwość korzystania z komunikatora bez konieczności potwierdzania
                            polityki naszego serwisu. Pamiętaj jednak, że zgadzając się z nią ułatwiasz nam życie.
                        </article>
                    </div>
                    <div className="chat-caffel">
                        <i className="fa fa-users"></i>
                        <h2>Komunikacja</h2>
                        <article>
                            Kontaktuj się ze z grupowiczami za pomocą komunikatora. Będąc w grupie i przeglądając posty, 
                            warto podzielić się wspólnymi wrażeniami. Pamiętaj, że możesz rozmawiać tylko z użytkownikami
                            będącymi członkami tych samych grup co ty.
                        </article>
                    </div>
                    <div className="chat-caffel">
                        <i className="fa fa-angellist"></i>
                        <h2>Zasady</h2>
                        <article>
                            Pamiętaj, aby podczas komunikacji nie ubliżać innym użytkownikom. Nie taka jest idea naszego serwisu.
                            Konwersacje powinny być prowadzone w miły i przyjazny sposób. 
                        </article>
                    </div>
                </div>
                <button onClick={props.confirmRodo} className="run-chat-btn">
                    Rozpocznij chatowanie!
                </button>          
    </Aux>
);

export default rodoPrompt;