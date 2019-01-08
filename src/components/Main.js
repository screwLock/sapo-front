import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Overview from './Overview/Overview';
import BlackoutDates from './BlackoutDates/BlackoutDates';
import Zipcodes from './Zipcodes/Zipcodes';
import Employees from './Employees/Employees';
import DonorPage from './DonorPage/DonorPage'
import Emails from './Emails/Emails'

class Main extends Component {
    render(){
      return(
        <Switch>
          <Route exact path='/' component={Overview}></Route>
          <Route path='/blackoutDates' component={BlackoutDates}></Route>
          <Route path='/zipcodes' component={Zipcodes}></Route>
          <Route path='/employees' component={Employees}></Route>
          <Route path='/donorPage' component={DonorPage}></Route>
          <Route path='/emails' component={Emails}></Route>
        </Switch>
      );
    }
  }
  
  export default withRouter(Main);