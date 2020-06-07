import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ListView from './components/ListView';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact key='home' path='/'>
            <ListView />
          </Route>
          <Route exact key='top' path='/top'>
            <ListView />
          </Route>
          <Route exact key='new' path='/new'>
            <ListView />
          </Route>
          <Route exact key='show' path='/show'>
            <ListView />
          </Route>
          <Route exact key='ask' path='/ask'>
            <ListView />
          </Route>
          <Route exact key='jobs' path='/jobs'>
            <ListView />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
