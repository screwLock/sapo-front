import * as React from 'react'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { AppToaster } from '../Toaster'
import * as EmailValidator from 'email-validator'
import AccessLevelSelect from "./Access_Level_Select"
import { API } from "aws-amplify"


class NewEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            employeeID: '',
            access: 'Volunteer',
            password: '',
            confirmPassword: '',
            isProcessing: false,
        }
    }

    addEmployee = async () => {
        // save the employee in cognito
        this.setState({ isProcessing: true },
            () => {
                if (!this.validateForms()) {
                    return false;
                }
                API.post("sapo", '/users/employees', {
                    body: {
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        phoneNumber: `+${this.state.phoneNumber.replace(/[^A-Za-z0-9]/g, '')}`,
                        employeeID: this.state.employeeID || 'NA',
                        access: this.state.access,
                        ID: Date.now() + Math.random().toString(36).substr(2, 9),
                        address: this.props.userAttributes.address,
                        password: this.state.password,
                    }
                }).then(response => {
                    this.setState({ isProcessing: false })
                    // persist the employee object
                    this.props.addEmployee({
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        email: this.state.email,
                        phoneNumber: `+${this.state.phoneNumber.replace(/[^A-Za-z0-9]/g, '')}`,
                        employeeID: this.state.employeeID || null,
                        access: this.state.access,
                        ID: Date.now() + Math.random().toString(36).substr(2, 9)
                    });
                    // reset the dialog inputs
                    this.setState({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phoneNumber: '',
                        employeeID: '',
                        access: 'Volunteer',
                        password: '',
                        confirmPassword: ''
                    })
                    // showToast is already done by updateuserconfig further up the tree
                    // this.showToast('Successfully Saved!')
                    this.props.handleEmployeeOpen();
                }).catch(error => {
                    this.setState({ isProcessing: false })
                    this.showToast(`Save Failed`)
                })
            }
        )
    }


    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    validateForms = () => {
        const phoneValidate = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if (this.state.firstName === '' ||
            this.state.lastName === '' ||
            this.state.email === '' ||
            this.state.phoneNumber === '' ||
            this.state.password === '' ||
            this.state.confirmPassword === ''
        ) {
            this.showToast('Required fields are missing')
            return false;
        }
        else if (!EmailValidator.validate(this.state.email)) {
            this.showToast('Enter a valid email address')
            return false
        }
        else if (!phoneValidate.test(this.state.phoneNumber)) {
            this.showToast('Enter a valid phone number')
            return false
        }
        else if (!passwordTest.test(this.state.password)) {
            this.showToast('Your password does not meet the requirements')
            return false
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.showToast('Passwords do not match')
            return false
        }
        else {
            return true;
        }

    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    handleAccess = (access) => {
        this.setState({ access: access })
    }


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
                        <InputGroup name='firstName' onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Last Name"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup name="lastName" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Email"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup name="email" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Phone Number"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup name="phoneNumber" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Employee ID"
                        labelFor="text-input"
                        labelInfo="(optional)"
                    >
                        <InputGroup name="employeeID" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="text-input"
                        labelInfo="(required)"
                        helperText="Passwords need to be a minimum of 8 characters, contain 1 special character, 1 upper case letter, 1 lower case letter, and 1 number"
                    >
                        <InputGroup name="password" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Re-enter Password"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup name="confirmPassword" onChange={this.onChange} />
                    </FormGroup>
                    <AccessLevelSelect onSelect={this.handleAccess} />
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleEmployeeOpen}>Cancel</Button>
                        <Button onClick={this.addEmployee} intent={Intent.PRIMARY} disabled={this.state.isProcessing}>Submit</Button>
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