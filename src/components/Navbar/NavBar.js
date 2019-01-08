import React, { Component } from 'react';
import { StyledNavbar, StyledNavLink } from './styles/navbar.js';

class NavBar extends Component {
  render(){

    return(
      <StyledNavbar>
      <nav>
        <ul>
          <li><StyledNavLink exact to='/' activeClassName="selected">Overview</StyledNavLink></li>
          <li><StyledNavLink to='/blackoutDates' activeClassName="selected">Blackout Dates</StyledNavLink></li>
          <li><StyledNavLink to='/zipcodes' activeClassName="selected">Zipcodes</StyledNavLink></li>
          <li><StyledNavLink to='/employees' activeClassName="selected">Employees</StyledNavLink></li>
          <li><StyledNavLink to='/donorPage' activeClassName="selected">Donor Page</StyledNavLink></li>
          <li><StyledNavLink to='/emails' activeClassName="selected">Emails</StyledNavLink></li>
        </ul>
      </nav>
      </StyledNavbar>
    );
  }
}

export default NavBar;
