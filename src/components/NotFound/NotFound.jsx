import React, { Component } from 'react'
import {Error404} from "./NotFound.style";
import { Jumbotron } from 'reactstrap';

class NotFound extends Component {
    render () {
        return (
            <Error404>
                <div className="container">
                    <Jumbotron >
                    <h1 className="display-3">Error 404</h1>
                        <p>Page not found.</p>
                    </Jumbotron>
                </div>
            </Error404>
        )
    }
}

export default NotFound