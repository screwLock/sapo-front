import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render(){
    return(
      <div>
      <nav>
        <ul>
          <li><NavLink to='/'>Overview</NavLink></li>
          <li><NavLink to='/blackoutDates'>Blackout Dates</NavLink></li>
          <li><NavLink to='/zipcodes'>Zipcodes</NavLink></li>
          <li><NavLink to='/employees'>Employees</NavLink></li>
          <li><NavLink to='/donorPage'>Donor Page</NavLink></li>
          <li><NavLink to='/emails'>Emails</NavLink></li>
        </ul>
      </nav>
      </div>
    );
  }
}

export default NavBar;
