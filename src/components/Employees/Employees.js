import * as React from 'react';
import styled from 'styled-components'
import NewEmployee from './NewEmployee';
import EditEmployee from './EditEmployee'
import { Button, H3, Intent } from '@blueprintjs/core';
import { AppToaster } from '../Toaster'
import { produce } from 'immer'
import EmployeesTable from './EmployeesTables'
import { API } from "aws-amplify"

class Employees extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
      isEmployeeOpen: false,
      isEditEmployeeOpen: false,
      editIndex: '',
      editEmployee: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        employeeID: '',
        access: 'Volunteer'
      },
    }
  }

  addEmployee = (employee) => {
    this.setState(
      produce(draft => {
        draft.employees.push(employee)
      }), async () => await this.saveEmployees()
    )
  }

  saveEmployees = () => {
    this.props.updateUserConfig('employees', this.state.employees, {employees: this.state.employees})
  }

  editEmployee = (edit) => {
    let employees = [...this.state.employees]
    let index = this.state.editIndex
    //update in database
    employees[index] = edit;
    this.setState({
        employees: employees
    }, async () => await this.saveEmployees())
}

  componentDidMount = async () => {
    if (!this.props.authState) {
      return;
    }
    try {
      if (this.props.userConfig.employees !== null) {
        this.setState({ employees: this.props.userConfig.employees });
      }
    } catch (e) {
      alert(e);
    }
  }

  createEditEmployee = (index) => {
    if (this.state.employees[index]) {
      this.setState({ editEmployee: this.state.employees[index] })
    }
    else {
      this.setState({ editEmployee: {} })
    }
  }

  getEditEmployee = () => {
    return this.state.editEmployee
  }

  handleDeleteEmployees = (i) => {
    let employees = [...this.state.employees]
    //delete from database
    employees.splice(i, 1)
    this.setState({
      employees: employees
    }, async () => this.saveEmployees())
  }

  handleEmployeeOpen = () => {
    this.setState({ isEmployeeOpen: !this.state.isEmployeeOpen })
  }

  handleEditEmployeeOpen = (index) => {
    this.handleEditIndexChange(index);
    this.createEditEmployee(index)
    this.setState({ isEditEmployeeOpen: !this.state.isEditEmployeeOpen })
  }

  handleEditEmployeeClose = () => {
    this.setState({ isEditEmployeeOpen: !this.state.isEditEmployeeOpen })
  }

  handleEditIndexChange = (index) => {
    this.setState({ editIndex: index })
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
        <EditEmployee editEmployee={this.editEmployee}
          employees={this.state.employees}
          isOpen={this.state.isEditEmployeeOpen}
          handleClose={this.handleEditEmployeeClose}
          index={this.state.editIndex}
          getEditEmployee={this.getEditEmployee}
          key={this.state.editEmployee.email}
        />
        <EmployeesTable data={this.state.employees} delete={this.handleDeleteEmployees} editEmployee={this.handleEditEmployeeOpen}/>
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