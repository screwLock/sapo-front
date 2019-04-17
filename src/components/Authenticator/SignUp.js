import * as React from 'react'
import styled from 'styled-components'
import { AnchorButton, Button, Checkbox, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import { Auth } from "aws-amplify"
import { Redirect, withRouter } from "react-router-dom"
import * as EmailValidator from 'email-validator'
import Terms from './Terms'

class SignUp extends React.Component {
    static defaultProps = {
        authData: {},
        authState: false,
        onAuthStateChange: (next, data) => { console.log(`SignUp:onAuthStateChange(${next}, ${JSON.stringify(data, null, 2)})`); }
    };

    constructor(props) {
        super(props);
        this.state = {
            authData: this.props.authData,
            authState: this.props.authState,
            modalShowing: false,
            error: null,
            loading: false,
            successShowing: false,
            firstName: '',
            lastName: '',
            organization: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            adminEmail: '',
            adminPassword: '',
            adminConfirmPassword: '',
            access: 'admin',
            isChecked: false,
            isTermsOpen: false,
        };
    }

    handleBack = () => {
        this.props.history.push('/')
    }

    handleCheckedChange = (e) => {
        this.setState({ isChecked: !this.state.isChecked })
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleTermsClose = () => this.setState({ isTermsOpen: false })

    handleTermsOpen = () => this.setState({ isTermsOpen: true })

    handleSignUp = () => {
        if (this.validateForms()) {
            this.onSignUp()
        }
        else {
            return false
        }
    }

    onSignUp = async () => {
        try {
            this.setState({ loading: true });
            const response = await Auth.signUp({
                username: this.state.email,
                password: this.state.password,
                attributes: {
                    'custom:first_name': this.state.firstName,
                    'custom:last_name': this.state.lastName,
                    'custom:phone': this.state.phone,
                    'custom:organization': this.state.organization,
                    'custom:access': this.state.access,
                }
            });
            console.log(`SignUp::onSignUp(): Response#1 = ${JSON.stringify(response, null, 2)}`);
            if (response.userConfirmed === false) {
                this.setState({ authData: response, modalShowing: true, loading: false, successShowing: true });
            } else {
                this.onAuthStateChange('default', { username: response.username });
            }
        } catch (err) {
            console.log(`SignUp::onSignUp(): Error ${JSON.stringify(err, null, 2)}`);
            this.setState({ error: err.message, loading: false });
        }
    }

    onConfirmSubmitted = async (token) => {
        try {
            this.setState({ loading: true });
            const response = await Auth.confirmSignUp(this.state.email, token);
            console.log(`SignUp::onConfirmSubmitted(): Response#2 = ${JSON.stringify(response, null, 2)}`);
            this.setState({ loading: false });
            if (response === 'SUCCESS') {
                this.props.onAuthStateChange('default', { email: this.state.email });
            }
        } catch (err) {
            console.log(`SignUp::onConfirmSubmitted(): Error ${JSON.stringify(err, null, 2)}`);
            this.setState({ error: err.message, loading: false });
        }
    }

    validateForms = () => {
        const phoneValidate = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
        if (this.state.email.length === 0 ||
            this.state.password.length === 0 ||
            this.state.confirmPassword.length === 0 ||
            this.state.firstName.length === 0 ||
            this.state.lastName.length === 0 ||
            this.state.phone.length === 0 ||
            this.state.organization.length === 0
        ) {
            this.setState({ error: 'Required fields are missing' })
            return false
        }
        else if (!EmailValidator.validate(this.state.email)) {
            this.setState({ error: 'Enter a valid email address' })
            return false
        }
        else if (!phoneValidate.test(this.state.phone)) {
            this.setState({ error: 'Enter a valid phone number' })
            return false
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ error: 'Your passwords do not match' })
            return false
        }
        else if (!passwordTest.test(this.state.password)) {
            this.setState({ error: 'Your password does not meet the requirements' })
            return false
        }
        else if (!EmailValidator.validate(this.state.adminEmail)){
            this.setState({ error: 'Enter a valid admin email'})
            return false
        }
        else if (this.state.adminEmail === this.state.email){
            this.setState({ error: 'Login email should not be the same as the admin email'})
            return false
        }
        else if (this.state.adminPassword.length <= 0){
            this.setState({ error: 'Pleae enter an admin password'})
            return false
        }
        else if (this.state.adminConfirmPassword.length <= 0){
            this.setState({ error: 'Please confirm your admin password'})
            return false
        }
        else if(this.state.adminPassword !== this.state.adminConfirmPassword){
            this.setState({ error: 'Your admin passwords do not match'})
            return false
        }
        else if (!this.state.isChecked) {
            this.setState({ error: 'You must agree to the terms of service' })
            return false
        }
        else {
            return true
        }
    }


    showSuccessMessage = () => {
        if (this.state.successShowing) {
            return 'Sign up successful.  Please check your email and click the confirmation link to login.';
        }
    }

    render() {
        const errorComponent = this.state.error !== null
            ? this.state.error
            : '';


        return (
            <div>
                <Container>
                    {/*this.state.error !== null && errorComponent*/}
                    <FormContainer>
                        <Logo>SAPO</Logo>
                        <FormGroup
                            label="First Name"
                            labelFor="text-input"
                        >
                            <InputGroup name="firstName" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup
                            label="Last Name"
                            labelFor="text-input"
                        >
                            <InputGroup name="lastName" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup
                            label="Email"
                            labelFor="text-input"
                            helperText="This email will be used by ALL users to log in to the main page"
                        >
                            <InputGroup name="email" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup
                            label="Organization"
                            labelFor="text-input"
                        >
                            <InputGroup name="organization" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup
                            label="Phone"
                            labelFor="text-input"
                        >
                            <InputGroup name="phone" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup
                            label="Password"
                            labelFor="text-input"
                            helperText="Passwords need to be a minimum of 8 characters, contain 1 special character, 1 upper case letter, 1 lower case letter, and 1 number"
                        >
                            <InputGroup name="password" onChange={this.handleChange} type='password' />
                        </FormGroup>
                        <FormGroup
                            label="Confirm Password"
                            labelFor="text-input"
                        >
                            <InputGroup name="confirmPassword" onChange={this.handleChange} type='password' />
                        </FormGroup>
                        <TitleRow>Administrative Login</TitleRow>
                        <FormGroup
                            label="Admin Email"
                            labelFor="text-input"
                            helperText="This email will be used for administrative login"
                        >
                            <InputGroup name="adminEmail" onChange={this.handleChange}/>
                        </FormGroup>
                        <FormGroup
                            label="Admin Password"
                            labelFor="text-input"
                        >
                            <InputGroup name="adminPassword" onChange={this.handleChange} type='password' />
                        </FormGroup>
                        <FormGroup
                            label="Confirm Admin Password"
                            labelFor="text-input"
                        >
                            <InputGroup name="adminConfirmPassword" onChange={this.handleChange} type='password' />
                        </FormGroup>
                        <TermsContainer>I accept the
                            <a onClick={this.handleTermsOpen}> SAPO terms of service.</a>
                            <TermsCheckbox checked={this.state.isChecked} inline={true} onChange={this.handleCheckedChange} />
                        </TermsContainer>
                        <ButtonRow>
                            <Button
                                loading={this.state.loading}
                                onClick={this.handleSignUp}
                                text='Sign Up'
                            />
                            <Button
                                loading={this.state.loading}
                                onClick={this.handleBack}
                                text='Back'
                            />
                        </ButtonRow>
                        <ErrorContainer>{`${errorComponent}`}</ErrorContainer>
                        <SuccessContainer>{this.showSuccessMessage()}</SuccessContainer>
                    </FormContainer>
                </Container>
                <Terms onClose={this.handleTermsClose} isOpen={this.state.isTermsOpen} />
            </div>
        );
    }
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    margin-top: 25px;
    margin-bottom: 50px;
`;

const Logo = styled.div`
    font-size:50px;
    font-weight: bold;
    text-align: center;
    padding: 20px 20px 0;
    margin:0;
`;

const TitleRow = styled.div`
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 15px;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 25px;
`;

const ErrorContainer = styled.p`
    color:red;
`;

const SuccessContainer = styled.p`
    color:blue;
`;

const TermsContainer = styled.div`
    margin-top: 10px;
`;

const TermsCheckbox = styled(Checkbox)`
    margin-left: 10px;
`

export default withRouter(SignUp);