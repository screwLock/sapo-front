import * as React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Authenticator from './Authenticator/Authenticator'

class App extends React.Component {

  render() {
    return (
      <Router>
        <Authenticator />
      </Router>
    );    
  };
}


export default App;
