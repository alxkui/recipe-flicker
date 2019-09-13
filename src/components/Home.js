import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Latest from './home/Latest';

class Home extends Component {
    render() {
        return (
            <main className="body-home">
                <div className="explanation">
                    <Container>

                        <h1>Flick through recipes with tap or voice</h1>

                    </Container>
                </div>

                <Latest />
            </main>
        );
    }
}

export default Home;