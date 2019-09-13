import React, { Component } from 'react';

class Recipe extends Component {
    render() {
        return(
            <div className="recipe-item">
                <div className="recipe-body">
                    <span className="info-meta"><i className="fas fa-utensils"></i> { this.props.difficulty }</span>
                    <span className="info-meta"><i className="fas fa-star"></i> { this.props.rating } / 5</span>
                    <span className="info-meta"><i className="fas fa-clock"></i> { this.props.time } Mins</span>
                    <img className="recipe-img" src={ this.props.recipeImg } alt={ this.props.recipeTitle }/>
                    <h4 className="recipe-title">{ this.props.recipeTitle}</h4>
                </div>
            </div>
        );
    }
}

export default Recipe;