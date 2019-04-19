import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Overview from './Overview/Overview';
import BlackoutDates from './BlackoutDates/BlackoutDates';
import Zipcodes from './Zipcodes/Zipcodes';
import Employees from './Employees/Employees';
import DonorPage from './DonorPage/DonorPage'
import Emails from './Emails/Emails'
import Account from './Account/Account'

class Main extends Component {
    render(){
      return(
        <Switch>
          <Route exact path='/'
                 render = {() => <Overview {...this.props}/>}
          />
          <Route exact path='/blackoutDates'
                 render = {() => <BlackoutDates {...this.props} />}
          />
          <Route exact path='/zipcodes'
                 render = {() => <Zipcodes {...this.props} />}
          />
          <Route exact path='/employees'
                 render = {() => <Employees {...this.props} />}
          />
          <Route exact path='/donorPage'
                 render = {() => <DonorPage {...this.props} />}
          />
          <Route exact path='/emails'
                 render = {() => <Emails {...this.props} />}
          />
          <Route exact path='/account'
                 render = {() => <Account {...this.props} />}
          />
        </Switch>
      );
    }
  }
  
  export default withRouter(Main);