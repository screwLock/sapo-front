import * as React from './node_modules/react'
import { H5 } from './node_modules/@blueprintjs/core'
import Select from './node_modules/react-select'
import styled from './node_modules/styled-components'


class EmployeeSelect extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        let selectedEmployee;
        if(this.props.selectedEmployee != null){
            selectedEmployee = this.props.selectedEmployee
        }
        else {
            selectedEmployee = {
                firstName: '',
                lastName: '',
                ID: ''
            }
        }
        const employeeOptions = this.props.employees.map(employee => ({ value: employee, label: `${employee.lastName}, ${employee.firstName}` }));
        return (
            <React.Fragment>
                <SelectContainer>
                    <H5>Employee Signature</H5>
                    <Select
                        value={{ value: selectedEmployee, label: `${selectedEmployee.lastName}, ${selectedEmployee.firstName}` }}
                        onChange={this.props.onChange}
                        options={employeeOptions}
                        isClearable={true}
                    />
                </SelectContainer>
            </React.Fragment>
        )
    }
}

const SelectContainer = styled.div`
    width: 250px;
    margin-top: 25px;
    margin-bottom: 25px;
`

export default EmployeeSelect