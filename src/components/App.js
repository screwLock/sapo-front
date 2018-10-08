import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";

import NavBar from './Navbar/NavBar.js';
import Sidebar from './Sidebar/Sidebar.js';
import Header from './Header/Header.js'
import Main from './Main.js';

class App extends Component {
  render() {
    return (
      <div>
        <Grid
          columns={"150px 1fr 50px"}
          rows={"70px 1fr 45px"}
          areas={[
            "header header  header",
            "menu   content ads   ",
            "footer footer  footer"
          ]}
          >
          <Cell area="header"><Header /></Cell>
          <Cell area="menu"><NavBar /></Cell>
          <Cell area="content"><Main /></Cell>
        </Grid>
      </div>
    );
  }
}

export default App;
