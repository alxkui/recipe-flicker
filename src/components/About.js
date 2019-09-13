import React from 'react';
import { Container } from 'react-bootstrap';

const About = () => {
    return(
        <div className="about">
            <div className="explanation">
                <Container>
                <i className="icon fas fa-question"></i>
                <h2>WHAT IS RECIPE FLICKER?</h2>
                </Container>
            </div>

            <Container>
                <h3>The idea behind recipe flicker</h3>
                <p>Recipe Flicker was developed with the aim to make the reading of recipes simpler and more accessible. Recipe Flicker achieves these aims by implementing a step by step approach as the user prepares the recipe. Recipe Flicker can read out the steps and the user can flick through them by simply tapping on the left or right side of your screen or by enabling voice recognition (which only works in chrome desktop).</p>

                <h3>Diet</h3>
                <p>Currently, recipe flicker will hold recipes for <strong>ketogenic</strong> diets. In the future this may expand to other diets such as: paleo, atkins etc...</p>

                <h3>The future of recipe flicker</h3>
                <p>Recipe flicker is currently on the beta stage which means that there will be weird bugs here and there. There are future plans for the app such as adding a meal planner option where users can favourite their recipes and add them to a bucket that will act as their week of eating, essentially assisting users to prepare their meals for the coming week.</p>
            </Container>
        </div>
    );
}

export default About;