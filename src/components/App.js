import React, { Component } from 'react';
import { Grid, Cell } from "styled-css-grid";

import NavBar from './NavBar.js';
import Sidebar from './Sidebar/Sidebar.js';
import Main from './Main.js';

class App extends Component {
  render() {
    return (
      <div>
        <Grid
          columns={"100px 1fr 100px"}
          rows={"45px 1fr 45px"}
          areas={[
            "header header  header",
            "menu   content ads   ",
            "footer footer  footer"
          ]}
          >
          <Cell area="header"><h1>SAPO</h1></Cell>
          <Cell area="menu"><NavBar /></Cell>
          <Cell area="content"><Main /></Cell>
        </Grid>
      </div>
    );
  }
}

export default App;
