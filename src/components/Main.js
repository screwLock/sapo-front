import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import Overview from './Overview/Overview.js';
import BlackoutDates from './BlackoutDates/BlackoutDates.js';
import Zipcodes from './Zipcodes/Zipcodes.js';
import Employees from './Employees/Employees.js';
import DonorPage from './DonorPage/DonorPage.js'

class Main extends Component {
    render(){
      return(
        <Switch>
          <Route exact path='/' component={Overview}></Route>
          <Route path='/blackoutDates' component={BlackoutDates}></Route>
          <Route path='/zipcodes' component={Zipcodes}></Route>
          <Route path='/employees' component={Employees}></Route>
          <Route path='/donorPage' component={DonorPage}></Route>
        </Switch>
      );
    }
  }
  
  export default Main;