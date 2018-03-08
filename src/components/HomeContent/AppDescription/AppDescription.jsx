import React from 'react';
import './AppDescription.css';
import Logo from '../../Logo/Logo';

const appDescription = (props) => {

    return(
        <div className="AppDescription">
            <h1>Opis Serwisu</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at quam ullamcorper, accumsan magna id, cursus justo. Etiam interdum ligula id dapibus sollicitudin. Integer a eros vitae mi auctor tincidunt eget ac sapien. In ac interdum urna. Mauris aliquet lectus ac ultricies vulputate. Ut et diam cursus, molestie ex sed, tristique augue. Mauris auctor ligula non vulputate tristique. Integer leo erat, pellentesque ultrices lobortis nec, porta vitae lorem. Fusce ultricies felis luctus lectus tristique feugiat. Praesent risus enim, ultricies non auctor ac, vestibulum ac augue. Integer volutpat interdum leo, lobortis tristique tellus. Fusce sed nisi finibus lectus fermentum pulvinar in eu risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin sit amet urna lacinia, vulputate odio sed, faucibus ante. Curabitur hendrerit quam vel enim suscipit, eget auctor dolor venenatis.</p>
            <Logo class="AppDescriptionLogo" width="50%"/>
        </div>
    );
}
export default appDescription;
