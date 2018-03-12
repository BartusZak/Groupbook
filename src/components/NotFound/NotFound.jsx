import React, { Component } from 'react'
import './NotFound.css';
import { Jumbotron, Button } from 'reactstrap';

class NotFound extends Component {
    render () {
        return (
            <div className="error404">
                <div className="container">
                    <Jumbotron >
                    <h1 className="display-3">Error 404</h1>
                        <p>Page not found.</p>
                    </Jumbotron>
                </div>
            </div>
        )
    }
}

export default NotFound