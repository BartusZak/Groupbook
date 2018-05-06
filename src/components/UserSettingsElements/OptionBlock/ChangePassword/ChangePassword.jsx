import React, {Component} from 'react';
import Aux from 'hoc/Auxi';
import Button from 'components/UI/Button';
import Spinner from 'components/UI/Spinner/Spinner';

class changePassword extends Component{
    constructor() {
        super();
        this.state = {
            loading: false,
            oldPassword: null,
            newPassword: null,
            repeatedNewPassword: null,
            formValid: false,
            errors: []
        };

        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    }

    newPasswordMatch(){
        if(this.state.newPassword === this.state.repeatedNewPassword){
            let errorsTmp = [...this.state.errors, "Hasła nie pasują do siebie."];

            this.setState({errors: errorsTmp});
            console.log(errorsTmp);
            return true;
        }
        return false;
    }

    changePasswordHandler = ( event ) => {
        event.preventDefault();
        let validation = this.newPasswordMatch();
        this.setState( { loading: true, formValid: validation } );
    }

    inputChangeHandler({target}){
        this.setState({[target.name]: target.value});
    }

    render(){
        let content;
        console.log(this.state.errors);

        content = (
            <Aux>
                <h2>Zmień hasło</h2>
                <hr/>
                <form onSubmit={this.changePasswordHandler}>
                    <ul>
                        <li>
                            <b>Stare hasło:</b>
                            <input name="oldPassword" onChange={this.inputChangeHandler}/>
                        </li>
                        <li>
                            <b>Nowe hasło:</b>
                            <input type="password" name="newPassword" onChange={this.inputChangeHandler}/>
                        </li>
                        <li>
                            <b>Powtórz hasło:</b>
                            <input type="password" name="repeatedNewPassword" onChange={this.inputChangeHandler}/>
                        </li>
                    </ul>
                    <Button type="submit" title="Zmień hasło"/>
                </form>
            </Aux>
        );

        if(this.state.loading){
            content = <Spinner/>;
        }

        return(
            <Aux>
                {content}
            </Aux>
        )
    }
}

export default changePassword;