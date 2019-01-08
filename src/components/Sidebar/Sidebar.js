import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from './routes.js';
import { StyledSidebar, StyledList } from "./styles/sidebar.js";

class Sidebar extends Component {
    render(){
      const { match } = this.props;
      return(
        <StyledSidebar>
          <StyledList>
            <li>
              <Link to="/overview">Overview</Link>
            </li>
            <li>
              <Link to="/blackoutDates">Blackout Dates</Link>
            </li>
            <li>
              <Link to="/zipcodes">Zipcodes</Link>
            </li>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/emails">Emails</Link>
            </li>
          </StyledList>
  
          {routes.map((route, index) => (
            // You can render a <Route> in as many places
            // as you want in your app. It will render along
            // with any other <Route>s that also match the URL.
            // So, a sidebar or breadcrumbs or anything else
            // that requires you to render multiple things
            // in multiple places at the same URL is nothing
            // more than multiple <Route>s.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}
      </StyledSidebar>
      );
    }
  }
  
  export default Sidebar;