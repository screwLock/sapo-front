import * as React from 'react'
import Select, {components} from 'react-select'
import SimpleBar from 'simplebar-react';
import '../../../../node_modules/simplebar-react/dist/simplebar.min.css';

// Input needs to be outside of the render method to prevent 
// rerender of HOC components everytime input value changes
const Input = ({ autoComplete, ...props }) => <components.Input {...props} autoComplete="new-password" />;

class EmployeeSelect extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        let selectedEmployee;
        if (this.props.selectedEmployee != null) {
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
        const renderScrollbar = props => {
            return (
              <SimpleBar style={{ maxHeight: 300 }}>{props.children}</SimpleBar>
            );
          };
        const groupStyles = {
            display: 'flex',
            justifyContent: 'space-between',
        };

        const formatGroupLabel = data => (
            <div style={groupStyles}>
                <span>{data.label}</span>
            </div>
        );
        const groupedOptions = [
            {
                label: 'Employees',
                options: employeeOptions,
            },
        ];
        return (
                <Select
                    value={{ value: selectedEmployee, label: selectedEmployee.firstName === ''? '':`${selectedEmployee.lastName}, ${selectedEmployee.firstName}` }}
                    onChange={this.props.onChange}
                    options={groupedOptions}
                    isClearable={true}
                    formatGroupLabel={formatGroupLabel}
                    components={{Input, MenuList: renderScrollbar}}
                />
        )
    }
}

export default EmployeeSelect