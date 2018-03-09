import React, { Component } from 'react';
import PostShortcut from '../../components/PostShortcut/PostShortcut';
import ProfilePic from '../../assets/img/profiles/facet.jpg';
import Avatar from '../../components/UI/Avatar/Avatar';
class UserStart extends Component {
    state = {
        data: [
            {id: 1, author: "tomaszNiecik", content: "Seserwis iiemny polecenia. Polecam serwis i tak dalej. Bedzie dobrze siemaneczkoSerwis godny polecenia. Polecam serwis i tak dalej. Bedzie dobrze siemaneczkoSerwis godny polecenia. Polecam serwis i tak dalej. Bedzie dobrze siemaneczkoSerwis godny polecenia. Polecam serwis i tak dalej. Bedzie dobrze siemaneczkoSerwis godny polecenia. Polecam serwis i tak dalej. Bedzie dobrze siemaneczkoSerwis godny polecenia. Polecam serwis i tak dalej. Bedzie dobrze siemaneczkoSerwis godny polecenia. Polecam serwis i tak dalej. Bedzie dobrze siemaneczkoSerwis godny polecenia. Polecam serwis i tak dalej. Bedzie dobrze siemaneczkosiemaneczko Serwis godny polecenia. Polecam serwis i tak dalej. Bedzie dobrze siemaneczko", image: <img src="" />  },
            {id: 2, author: "tomaszNiecik", 
            content: "sdasdsadsadsadsadsadsadsadsadasdsasdaddddddddddddsadsasadsa sasadsadsa", image: null},
            {id: 3, author: "tomaszNiecik", 
            content: "sdasdsadsadsadsadsadsadsadsadasdsasdasadsaddsads adsadsadsadsadsadsas adsasasadsadsa", image: null},
            {id: 4, author: "tomaszNiecik", 
            content: "sdasdsadsadsadsadsadsadsadsadasdsasdasad saddsadsadsadsadsadsads adsasadsasasadsadsa" , image: null},

        ]
    }

    render(){
        return (
            <div>
                <PostShortcut data={this.state.data}/>
            </div>
        );
    }
}

export default UserStart;