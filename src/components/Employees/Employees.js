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
      editEmployee: '',
      userConfig: {}
    }
  }

  addEmployee = (employee) => {
    this.setState(
      produce(draft => {
        draft.employees.push(employee)
      }), async () => await this.saveEmployees()
    )
    //save to database
    this.showToast(`Employee Saved`);
  }

  saveEmployees = () => {
    API.post("sapo", "/users", {
      body: {
        employees: this.state.employees
      }
    });
  }

  editEmployee = (edit) => {
    let employees = [...this.state.employees]
    let index = this.state.editIndex
    //update in database
    employees[index] = edit;
    this.setState({
      employees: employees
    })
  }

  componentDidMount = async () => {
    if (!this.props.authState) {
      return;
    }
    try {
      const userConfig = await this.getUserConfig();
      if (userConfig.employees !== null) {
        this.setState({ userConfig, employees: userConfig.employees });
      }
      else {
        this.setState({ userConfig })
      }
    } catch (e) {
      alert(e);
    }
  }

  getUserConfig = () => {
    return API.get("sapo", '/users');
  }

  getEditZipcode = (index) => {
    if (this.state.employees[index]) {
      this.setState({ editEmployee: this.state.employees[index] })
    }
    else {
      this.setState({ editEmployee: {} })
    }
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
    this.getEditEmployee(index)
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
          handleClose={this.handleEditEmployeeOpen}
          index={this.state.editIndex}
          employee={this.state.editEmployee}
        />
        <EmployeesTable data={this.state.employees} delete={this.handleDeleteEmployees} />
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