import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Overview from './Overview/Overview';
import BlackoutDates from './BlackoutDates/BlackoutDates';
import MaxPickups from './MaxPickups/MaxPickups'
import Zipcodes from './Zipcodes/Zipcodes';
import Employees from './Employees/Employees';
import Categories from './Categories/Categories'
import Emails from './Emails/Emails'
import Photos from './Photos/Photos'
import Branding from './Branding/Branding'
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
          <Route exact path='/maxPickups'
                 render = {() => <MaxPickups {...this.props} />}
          />
          <Route exact path='/employees'
                 render = {() => <Employees {...this.props} />}
          />
          <Route exact path='/categories'
                 render = {() => <Categories {...this.props} />}
          />
          <Route exact path='/emails'
                 render = {() => <Emails {...this.props} />}
          />
          <Route exact path='/branding'
                 render = {() => <Branding {...this.props} />}
          />
          <Route exact path='/photos'
                 render = {() => <Photos {...this.props} />}
          />
          <Route exact path='/account'
                 render = {() => <Account {...this.props} />}
          />
        </Switch>
      );
    }
  }
  
  export default withRouter(Main);