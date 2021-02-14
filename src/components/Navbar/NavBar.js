import React, { Component } from 'react';
import styled from 'styled-components'
import { NavLink, withRouter } from 'react-router-dom';

class NavBar extends Component {
  render(){

    return(
      <Container>
      <nav>
        <ul>
          <li><StyledNavLink exact to='/' activeClassName="selected">Overview</StyledNavLink></li>
          <li><StyledNavLink to='/blackoutDates' activeClassName="selected">Blackout Dates</StyledNavLink></li>
          <li><StyledNavLink to='/zipcodes' activeClassName="selected">Zipcodes</StyledNavLink></li>
          <li><StyledNavLink to='/maxPickups' activeClassName="selected">Max Pickups</StyledNavLink></li>
          <li><StyledNavLink to='/employees' activeClassName="selected">Employees</StyledNavLink></li>
          <li><StyledNavLink to='/categories' activeClassName="selected">Categories</StyledNavLink></li>
          <li><StyledNavLink to='/emails' activeClassName="selected">Emails</StyledNavLink></li>
          <li><StyledNavLink to='/branding' activeClassName="selected">Branding</StyledNavLink></li>
          <li><StyledNavLink to='/photos' activeClassName="selected">Photos</StyledNavLink></li>
          <li><StyledNavLink to='/account' activeClassName="selected">Account</StyledNavLink></li>
        </ul>
      </nav>
      </Container>
    );
  }
}

const Container = styled.div`

    ul {
        list-style: none;
        padding: 0;
        left-margin: 0;
        display: flex;
        flex-direction: column;


        li {
            top-margin: 0;
            font-size: 16px;
            display: flex;

            &:hover {
                background: #f4f4f4;
                color:#0078d4;
            }

        }
    }
`;

const StyledNavLink = styled(NavLink)`
    color: black;
    padding: 15px;
    flex: 1;
    &.selected{
        font-weight: bold;
        color:#0078d4;
        background-color: #f4f4f4;

        :hover {
            background-color: #DCDCDC;
        }
    }
    &:hover {
        text-decoration:none;
    }

`;

export default withRouter(NavBar);
