import * as React from 'react';
import NewEmployee from './NewEmployee';
import { Button, H3 } from '@blueprintjs/core';
import { AppToaster} from '../Toaster'

class Employees extends React.Component {

  handleClick = () => {
    this.showToast(`Enter an Employee`);
    //database call
  }

  showToast = (message) => {
    AppToaster.show({ message: message });
  }

  render() {
    return (
      <div>
        <H3>Add a New Employee</H3>
        <NewEmployee />
        <div><Button onClick={this.handleClick}>Submit</Button></div>
      </div>
    );
  }
}

export default Employees;