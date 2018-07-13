import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CreateContract from './components/CreateContract';
 
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
            <Route exact path="/" component={HomePage} />
            <Route path="/contract" component={CreateContract}  />
            <Route path="/topics" />
        </div>
      </Router>
    );
  }
}

export default App;
