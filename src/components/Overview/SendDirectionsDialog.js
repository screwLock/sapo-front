import * as React from 'react'
import { Button, Classes, H5, InputGroup, Intent, Dialog } from "@blueprintjs/core"
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

    handleClose = () => {
        this.setState({ employee: {} },
            this.props.handleOpen
        )
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
                    employee: {},
                });
                break;
        }
    }

    handleSubmit = () => {
        const employee = this.state.employee
        if(Object.entries(employee).length !== 0){
            API.post("sapo", '/routing', {
                body: {
                    email: employee.value,
                    pickups: this.props.pickups,
                    user: this.props.user
                }
            }).then(response => {
                this.showToast('Successfully Saved!')
            }).catch(error => {
                this.showToast(`Save Failed`)
            })
        }
        else {
            this.showToast('You need to select a driver to send routes to')
        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    render() {
        return (
            <Dialog
                isOpen={this.props.isOpen}
                onClose={this.handleClose}
                title='Send Directions to Drivers'
            >
                <DialogContainer>
                    <div>
                        <H5>Route:</H5>
                        <ol>
                            {this.props.pickups.map(pickup => {
                                return (
                                    <li key={pickup.email}>{pickup.streetAddress}, {pickup.zipcode}</li>
                                )
                            })}
                        </ol>
                    </div>
                    <div>
                        <H5>Send To Driver:</H5>
                        <EmployeeSelect
                            onChange={this.handleEmployeeSelect}
                            employees={this.props.userConfig.employees}
                            selectedEmployee={this.state.employee}
                        />
                    </div>
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.handleClose}>Cancel</Button>
                        <Button onClick={this.handleSubmit} intent={Intent.PRIMARY}>Submit</Button>
                    </div>
                </div>
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