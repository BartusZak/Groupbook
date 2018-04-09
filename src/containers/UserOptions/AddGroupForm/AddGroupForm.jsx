import React, { Component } from 'react';
import './AddGroupForm.css';
import Dropzone from 'react-dropzone';
class AddGroupForm extends Component{
    render(){
        return(
            <div className="add-group-form-main-div">
                <div className="add-group">
                    <form>
                        <input type="submit" value="Dodaj grupę" />
                        <section>
                            <label></label>
                            <input type="text" min={3} placeholder="wpisz nazwę grupy..."/>
                        </section>
                        <section>
                            <label></label>
                            <textarea>

                            </textarea>
                        </section>
                        <Dropzone>

                        </Dropzone>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default AddGroupForm;
