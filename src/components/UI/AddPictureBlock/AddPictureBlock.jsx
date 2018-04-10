import React from 'react';
import './AddPictureBlock.css';
import Aux from '../../../hoc/Auxi';
import Dropzone from 'react-dropzone'

const addPictureBlock = (props) => {
    const filesCount = props.files.length; 

    const correctContent = (
        props.incorrectPictureError !== "" ? <p>{props.incorrectPictureError}</p> : 
        <Aux>
            {props.files.length === 0 ? <p>przeciągnij i upuść</p> :
                props.files.map(file => {
                    return (
                        <div className="preview-cont">
                            <p key={file.preview}>{file.name} {file.size} bajtów  <img src={file.preview} /></p>
                            
                        </div>
                    );
                })}
            
            <span style={{visibility: filesCount === 0 ? 'hidden' : 'visible'}} 
            onClick={props.deleteFiles}>Usuń zdjęcie </span>
           
        </Aux>
    );
    return (
        <div className="view-block">
        <p>Dodaj zdjecie <b>(opcjonalne)</b></p>
            <Dropzone style={{color: filesCount === 0 
            ? 'rgba(255,255,255,0.4)' : 'rgb(255,255,255)',
            border: filesCount === 0 ? '4px dashed rgba(255,255,255,0.4)' :
            '4px dashed rgb(255,255,255)' }} accept="image/jpeg, image/png, image/jpg" className="drag-drop-place" onDrop={props.onDropped}
            disabled={filesCount === 0 ? false : true}>
            
            {correctContent}
            
            </Dropzone>
            <button onClick={props.clicked}>
                {props.buttonTitle}
            </button>   

        </div>  
    );
}

export default addPictureBlock;