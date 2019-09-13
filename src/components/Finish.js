import React from 'react';
import { Link } from 'react-router-dom';

const Finish = () => {
    return(
        <div className="finished-dialogue">
            <div className="inner">
                <i className="icon fas fa-smile"></i>
                <h2>You are finished</h2>
                <p>Thank you for using Recipe<strong>Flickr</strong></p>
                <Link className="home-button" to={'/'}>Go Home</Link>
            </div>
        </div>
    );
}

export default Finish;