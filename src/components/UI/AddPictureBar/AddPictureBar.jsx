import React from 'react';
import './AddPictureBar.css';
import Dropzone from 'react-dropzone';
const addPictureBar = (props) => {
    return(
        <div style={{height: props.height}} className="right-form-content">
            <label>{props.mainLabelTitle}</label>
            <Dropzone
            disabled={props.filesLength === 0 ? false : true} 
            onDrop={props.onDropHandler}
            className={props.filesLength === 0 ? 
            "add-group-drop-zone add-group-drop-zone-before-add" : "add-group-drop-zone add-group-drop-zone-after-add"}
            >
                <div>
                    <span className={props.filesLength === 0 ?
                    null : "after-add-desc"}>{props.filesErrorType !== "" ?
                    props.filesErrorType : props.filesLength === 0 ? 
                    "przeciągnij i upuść zdjęcie" 
                    : "Dodałeś zdjęcie " + props.files[0].name +
                    " " + props.files[0].size + " bitów"} </span>

                    {props.files.length > 0 ? <img 
                    src={props.files[0].preview} 
                    alt={props.files[0].name} /> : null }
                </div>
                {props.filesLength > 0 ? <span
                onClick={props.deleteAddedPictureHandler} 
                className="delete-added-pic">
                Usuń zdjęcie</span> : null}

                
            </Dropzone>
            <button onClick={props.onSubmitHandler} className={props.isGroupForm ? "add-new-group-button" : "add-new-other"}>{props.buttonTitle}</button> 
        </div>
    );
}

export default addPictureBar;