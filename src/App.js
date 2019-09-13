import React , {Component} from 'react';
import './App.css';
import TaskBody from './components/TaskBody';
import Menu from './components/menu/Menu';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RecipeInfo from './components/RecipeInfo';
import Logo from './components/Logo';
import { Container } from 'react-bootstrap';
import NoMatch from './components/NoMatch';
import About from './components/About';
import Dashboard from './components/Dashboard';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="main-header">
            <Container fluid={true}>
              <Logo />
              <Menu />
            </Container>
          </div>
          
          <Switch>
            <Route path="/recipe/flicker/:id" component={TaskBody} />
            <Route path="/recipe/:id" exact component={RecipeInfo} />
            <Route path="/about" exact component={About} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/" exact component={Home} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
  
}

export default App;
