import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isPressed: false
    }

    this.menuClickHandler = this.menuClickHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }

  menuClickHandler() {
    this.setState({
      isPressed: !this.state.isPressed
    });
  }

  closeHandler() {
    this.setState({
      isPressed: !this.state.isPressed
    });
  }

  render() {
    return (
      <div>
        <div className={this.state.isPressed ? 'menu menu-open' : 'menu menu-close'} onClick={this.menuClickHandler}>
            <div className="menu-line"></div>
            <div className="menu-line"></div>
            <div className="menu-line"></div> 
        </div>
          
        <div className={this.state.isPressed ? 'menu-view open' : 'menu-view'}>
          <div className="inner-menu">
            <h2>Where would you like to go?</h2>
            <ul>
                <Link onClick={this.closeHandler} to="/"><li>
                    Home
                </li></Link>

                <Link onClick={this.closeHandler} to="/about"><li>
                    About
                </li></Link>
            </ul>
          </div>
        </div>

      </div>
    );
  }

}

export default Menu;
