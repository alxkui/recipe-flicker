import React, { Component } from 'react';
import firebase from '../firebase';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Ingredient from './Ingredient';
import Preparing from './Preparing';

class RecipeInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: null,
            description: null,
            ingredients: [],
            preparing: [],
            difficulty: null,
            rating: null,
            tags: null,
            img: null,
            time: null
        }

    }

    componentDidMount(props) {
        const id = this.props.match.params.id;
        
        let docRef = firebase.firestore().collection('recipes').doc(id);
        docRef.get().then((doc) => {
            if(doc.exists) {
                let data = doc.data();
                this.setState({
                    id: id,
                    title: data.title,
                    description: data.description,
                    ingredients: data.ingredients,
                    preparing: data.preparing,
                    difficulty: data.difficulty,
                    rating: data.rating,
                    tags: data.tags.join(', '),
                    img: data.img,
                    time: data.time
                });
            }

        });
    }

    render() {
        return(
            <Container>
            <div className="recipe-info-body">
                    <div className="recipe-info-image">
                        <img src={this.state.img} alt={this.state.title}/>
                    </div>
                    <div className="recipe-info-meta">
                        <span className="info-meta recipe-info-rating"><i className="fas fa-star"></i> { this.state.rating}/5</span>
                        <span className="info-meta recipe-info-difficulty"><i className="fas fa-utensils"></i> { this.state.difficulty}</span>
                        <span className="info-meta recipe-info-tags"><i className="fas fa-tags"></i> { this.state.tags}</span>
                        <span className="info-meta recipe-info-time"><i className="fas fa-clock"></i> { this.state.time } Mins</span>
                        <h2 className="recipe-info-title">{ this.state.title }</h2>
                        <div className="recipe-info-description">
                            <p>{this.state.description}</p>
                        </div>
                        <Link to={'/recipe/flicker/' + this.state.id} className="flick-button">Flick through</Link>


                        <div className="ingredients">
                            <h4>Ingredients</h4>
                            <ul>
                                {this.state.ingredients.map(ing => {
                                    return <Ingredient key={ing} ingredient={ing} />
                                })}
                            </ul>

                            <h4>How to prepare</h4>
                            <ul>
                                {this.state.preparing.map(prep => {
                                    return <Preparing key={this.state.id} preparing={prep} />
                                })}
                            </ul>
                            <Link to={'/recipe/flicker/' + this.state.id} className="flick-button">Flick through</Link>
                        </div>
                        
                    </div>
            </div>
            </Container>
        );
    }

}

export default RecipeInfo;