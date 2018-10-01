import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  render(){
    return(
      <div style={{ display: "flex" }}>
      <div
      style={{
          padding: "10px",
          width: "10%",
          background: "#f0f0f0"
          }}
      >
      <nav>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/overview'>Overview</NavLink></li>
          <li><NavLink to='/blackoutDates'>Blackout Dates</NavLink></li>
          <li><NavLink to='/zipcodes'>Zipcodes</NavLink></li>
          <li><NavLink to='/employees'>Employees</NavLink></li>
          <li><NavLink to='/categories'>Categories</NavLink></li>
          <li><NavLink to='/emails'>Emails</NavLink></li>
        </ul>
      </nav>
      </div>
      </div>
    );
  }
}

export default NavBar;
