import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import firebase from '../../firebase';
import Recipe from './Recipe';
import { Link } from 'react-router-dom';

class Latest extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        firebase
        .firestore()
        .collection('recipes')
        .onSnapshot((snapshot) => {
            const recipe = snapshot.docs.map((doc) => ({
                id: doc.id,
                difficulty: doc.data().difficulty,
                rating: doc.data().rating,
                time: doc.data().time,
                title: doc.data().title,
                img: doc.data().img
            }));
            this.setState({
                recipes: recipe
            })
        });
    }

    render() {
        return (
            <section className="latest">
                <Container fluid={true}>
                    <h3>Latest recipes</h3>
                    <div className="recipe-row">
                        {this.state.recipes.map((recipe) => {
                            return (
                                <Link key={recipe.id + '1'} to={'recipe/' + recipe.id}>
                                    <Recipe key={recipe.id} difficulty={recipe.difficulty} rating={recipe.rating} recipeTitle={recipe.title} time={recipe.time} recipeImg={recipe.img} />
                                </Link>
                            )
                        })}
                    </div>
                </Container>
            </section>
        );
    }
}

export default Latest;