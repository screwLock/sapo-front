import React, { Component } from 'react';
import NavBar from './NavBar.js';
import Sidebar from './Sidebar/Sidebar.js';
import Main from './Main.js';

class App extends Component {
  render() {
    return (
      <div>
        <h1>SAPO</h1>
        <NavBar />
        <Main />
      </div>      
    );
  }
}

export default App;
