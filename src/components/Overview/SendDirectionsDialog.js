import * as React from 'react'
import { Button, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { API } from "aws-amplify"
import { AppToaster } from '../Toaster'
import EmployeeSelect from './EmployeeSelect'

class SendDirectionsDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: {}
        }
    }

    handleDialogClose = () => {
        this.props.handleOpen()
    }

    handleEmployeeSelect = (employee, action) => {
        switch (action.action) {
            case 'select-option':
                this.setState({
                    employee: employee,
                });
                break;
            case 'clear':
                this.setState({
                    employee: '',
                });
                break;
        }
    }

    render() {
        return (
            <Dialog
                isOpen={this.props.isOpen}
                onClose={this.handleDialogClose}
                title='Send Directions to Employees'
            >
                <DialogContainer>
                    <div>
                        <EmployeeSelect
                            onChange={this.handleEmployeeSelect}
                            employees={this.props.userConfig.employees}
                            selectedEmployee={this.state.employee}
                        />
                    </div>
                </DialogContainer>
            </Dialog>
        )
    }
}

const DialogContainer = styled.div`
    width: 550px;
    margin: 20px;
    margin-top: 10px;
`

export default SendDirectionsDialog