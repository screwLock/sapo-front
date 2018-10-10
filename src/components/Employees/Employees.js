import * as React from 'react';
import NewEmployee from './NewEmployee';
import { H3 } from '@blueprintjs/core';

class Employees extends React.Component {
    render(){
      return(
        <div>
          <H3>Add a New Employee</H3>
          <NewEmployee />
        </div>
      );
    }
  }
  
  export default Employees;