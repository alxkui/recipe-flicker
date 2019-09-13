import React from 'react';
import {Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';

const NoMatch = () => {
    return(
        <div className="forohfor">
            <Container>
                <span className="oof">404</span>
                <h4>Oof! Looks like this page doesn't exist.</h4>
                <Link className="home-button" to="/">GO HOME</Link>
            </Container>
        </div>
    );
}

export default NoMatch;