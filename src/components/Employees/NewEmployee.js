import * as React from 'react'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
// import * as EmailValidator from 'email-validator';
import AccessLevelSelect from "./Access_Level_Select"


class NewEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: {
                lastName: 'gay'
            }
        }
    }

    addEmployee = () => {

        this.props.addEmployee(this.state.employee);
        this.props.handleEmployeeOpen();
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })


    render() {
        return (
            <Dialog isOpen={this.props.isEmployeeOpen}
                title='Add a New Employee'
                onClose={this.props.handleEmployeeOpen}
            >
                <DialogContainer>
                    <FormGroup
                        label="First Name"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Last Name"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup id="employeeLastName" placeholder="Last Name" />
                    </FormGroup>
                    <FormGroup
                        label="Email"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup id="employeeEmail" placeholder="Email" />
                    </FormGroup>
                    <FormGroup
                        label="Phone Number"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup id="employeePhoneNumber" placeholder="Phone Number" />
                    </FormGroup>
                    <FormGroup
                        label="Employee ID"
                        labelFor="text-input"
                        labelInfo="(optional)"
                    >
                        <InputGroup id="employeeID" placeholder="Employee ID" />
                    </FormGroup>
                    <AccessLevelSelect />
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleEmployeeOpen}>Cancel</Button>
                        <Button onClick={this.addEmployee} intent={Intent.PRIMARY}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        );
    }
}

const DialogContainer = styled.div`
    width: 250px;
    margin: 20px;
`

export default NewEmployee;