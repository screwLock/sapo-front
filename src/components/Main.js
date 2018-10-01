import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Home from './Home.js';
import Overview from './Overview/Overview.js';
import BlackoutDates from './BlackoutDates/BlackoutDates.js';

class Main extends Component {
    render(){
      return(
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/overview' component={Overview}></Route>
          <Route path='/blackoutDates' component={BlackoutDates}></Route>
        </Switch>
      );
    }
  }
  
  export default Main;