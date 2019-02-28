import * as React from 'react'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'
import { AppToaster } from '../Toaster'
 import * as EmailValidator from 'email-validator';
import AccessLevelSelect from "./Access_Level_Select"


class EditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            employeeID: '',
            access: 'Volunteer',
        }
    }

    componentDidMount = () => {
        this.setState({ firstName: this.props.getEditEmployee().firstName, 
                        lastName: this.props.getEditEmployee().lastName,
                        email: this.props.getEditEmployee().email,
                        phoneNumber: this.props.getEditEmployee().phoneNumber,
                        employeeID: this.props.getEditEmployee().employeeID,
                        access: this.props.getEditEmployee().access
                     })
    }

    handleSubmit = () => {
        if (!this.validateForms()) {
            return false;
        }
        this.props.addEmployee({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            employeeID: this.state.employeeID,
            access: this.state.access
        });
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
            employeeID: '',
            access: 'Volunteer',
        })
        this.props.handleEmployeeOpen();
    }


    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    validateForms = () => {
        const phoneValidate = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        if (this.state.firstName === '' ||
            this.state.lastName === '' ||
            this.state.email === '' ||
            this.state.phoneNumber === ''
        ) {
            this.showToast('Required fields are missing')
            return false;
        }
        else if(!EmailValidator.validate(this.state.email)){
            this.showToast('Enter a valid email address')
            return false
        }
        else if(!phoneValidate.test(this.state.phoneNumber)){
            this.showToast('Enter a valid phone number')
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
            <Dialog isOpen={this.props.isOpen}
                title='Edit An Employee'
                onClose={this.props.handleClose}
            >
                <DialogContainer>
                    <FormGroup
                        label="First Name"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup defaultValue={this.state.firstName} name='firstName' onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Last Name"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup defaultValue={this.state.lastName} name="lastName" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Email"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup defaultValue={this.state.email} name="email" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Phone Number"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <InputGroup defaultValue={this.state.phoneNumber} name="phoneNumber" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Employee ID"
                        labelFor="text-input"
                        labelInfo="(optional)"
                    >
                        <InputGroup defaultValue={this.state.employeeID} name="employeeID" onChange={this.onChange} />
                    </FormGroup>
                    <AccessLevelSelect onSelect={this.handleAccess} />
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleClose}>Cancel</Button>
                        <Button onClick={this.handleSubmit} intent={Intent.PRIMARY}>Submit</Button>
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

export default EditEmployee;