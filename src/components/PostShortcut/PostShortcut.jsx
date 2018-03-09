import React from 'react';
import './PostShortcut.css';
import Button from '../UI/Button';
import SmallPost from './SmallPost/SmallPost';


const postshort = (props) => {
    const requestData = props.data;
    return (
        <div className="PostShortcut">
            <Button title="Dodaj post" class="margins" url="/addpost"/>
            <h2>Nowe posty</h2>
            {requestData.map(item => {
                return <SmallPost 
                author={item.author} 
                key={item.id} 
                postContent={item.content}
                image={item.image} />;
            })}
          

        </div>
    );
}


export default postshort;