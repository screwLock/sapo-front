import * as React from 'react'
import Select, { components } from 'react-select';
import styled from 'styled-components'

const Input = ({ autoComplete, ...props }) => <components.Input {...props} autoComplete="new-password" />;

class EmployeeSelect extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const employeeOptions = this.props.employees.map(employee => ({ value: employee.email, label: `${employee.lastName}, ${employee.firstName} (${employee.email})` }));
        return (
            <SelectContainer>
                <Select
                    onChange={this.props.onChange}
                    options={employeeOptions}
                    isClearable={true}
                    components={{Input}}
                />
            </SelectContainer>
        )
    }
}

const SelectContainer = styled.div`
    width: 350px;
    margin-top: 25px;
    margin-bottom: 25px;
    margin-left: 20px;
`

export default EmployeeSelect