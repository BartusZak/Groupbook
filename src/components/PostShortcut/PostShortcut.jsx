import React from 'react';
import './PostShortcut.css';
import Button from '../UI/Button';
import SmallPost from './SmallPost/SmallPost';
import Facet from '../../assets/img/profiles/facet.jpg';
import Aux from '../../hoc/Auxi';


const postshort = (props) => {
    const requestData = props.data;
    let postShortcut = null;

    if(props.error){
        postShortcut = <h1>Wystąpił błąd podczas komunikacji z serwerem</h1>;
    }
    else{
        postShortcut = (
            <Aux>   
                   
                   <Button title="Dodaj post" class="margins" url="/addpost"/>
                    {requestData.map(item => {
                        return <SmallPost 
                        author={item.id} 
                        key={item.id} 
                        postContent={item.title}
                        image={Facet} />;
                    })}
                    <Button title="Następne" clicked={props.clicked}/>
                    
            </Aux>
        );
    }
    return (
        <div className="PostShortcut">
            {postShortcut}
        </div>
    );
}


export default postshort;