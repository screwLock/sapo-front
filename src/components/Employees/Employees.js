import * as React from 'react';
import styled from 'styled-components'
import NewEmployee from './NewEmployee';
import { Button, H3, Intent } from '@blueprintjs/core';
import { AppToaster} from '../Toaster'
import { produce } from 'immer'
import EmployeesTable from './EmployeesTables'

class Employees extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      employees: [],
      isEmployeeOpen: false
    }
  }

  addEmployee = (employee) => {
    this.setState(
      produce(draft => {
        draft.employees.push(employee)
      })
    ) 
    //save to database
    this.showToast(`Employee Saved`);
  }

  
  handleDeleteEmployees = (i) => {
    let employees = [...this.state.employees]
    //delete from database
    employees.splice(i, 1)
    this.setState({ 
      employees: employees
    })
  }

  handleEmployeeOpen = () => {
    this.setState({isEmployeeOpen: !this.state.isEmployeeOpen})
  }

  showToast = (message) => {
    AppToaster.show({ message: message });
  }

  render() {
    return (
      <Container>
        <H3>Manage Employees</H3>
        <ButtonRow>
          <Button intent={Intent.PRIMARY} onClick={this.handleEmployeeOpen}>Add a New Employee</Button>
        </ButtonRow>
        <NewEmployee addEmployee={this.addEmployee} 
                     employees={this.state.employees} 
                     isEmployeeOpen={this.state.isEmployeeOpen}
                     handleEmployeeOpen={this.handleEmployeeOpen}
        />
        <EmployeesTable data={this.state.employees} delete={this.handleDeleteEmployees}/>
      </Container>
    );
  }
}

const Container = styled.div`
  margin: 25px;
`

const ButtonRow = styled.div`
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
`

export default Employees;