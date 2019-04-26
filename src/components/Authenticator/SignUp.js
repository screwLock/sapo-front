import * as React from 'react'
import styled from 'styled-components'
import { AnchorButton, Button, Checkbox, Classes, FormGroup, InputGroup, Intent, Dialog, Alignment } from "@blueprintjs/core"
import { Auth } from "aws-amplify"
import { Redirect, withRouter } from "react-router-dom"
import * as EmailValidator from 'email-validator'
import Terms from './Terms'
import { postalCodeValidator } from '../Zipcodes/postalCodeValidator'

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
            streetAddress: '',
            city: '',
            state: '',
            zipcode: '',
            email: '',
            phone: '',
            isNonProfit: false,
            ein: '',
            password: '',
            confirmPassword: '',
            adminUserName: '',
            adminPassword: '',
            adminConfirmPassword: '',
            access: 'admin',
            isTermsChecked: false,
            isTermsOpen: false,
        };
    }

    handleBack = () => {
        this.props.history.push('/')
    }

    handleCheckedChange = (e) => {
        this.setState({ [e.target.name]: !this.state[e.target.name] })
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
        let ein = this.state.ein;
        if(this.state.ein.length === 0 && this.state.isNonProfit === false){
            ein = 'NA'
        }
        try {
            this.setState({ loading: true });
            const response = await Auth.signUp({
                username: this.state.email,
                password: this.state.password,
                attributes: {
                    'custom:first_name': this.state.firstName,
                    'custom:last_name': this.state.lastName,
                    'custom:phone': this.state.phone.replace(/[^A-Za-z0-9]/g, ''),
                    'custom:organization': this.state.organization,
                    'custom:streetAddress': this.state.streetAddress,
                    'custom:city': this.state.city,
                    'custom:zipcode': this.state.zipcode.replace(/[^A-Za-z0-9]/g, ''),
                    'custom:state': this.state.state,
                    'custom:isNonProfit': this.state.isNonProfit,
                    'custom:ein': ein.replace(/[^a-zA-Z0-9-_]+/g,''),
                    'custom:adminUserName1': this.state.adminUserName,
                    'custom:adminPassword1': this.state.adminPassword,
                    'custom:membership': 'trial',
                    'custom:createdAt': new Date(),
                    // 'custom: stripeID: '',
                    // 4 additional pairs for admins
                    // 'custom: adminUserName2: '',
                    // 'custom: adminPassword2: '',
                    // ...admin3,4,5...pass3,4,5...
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
            this.state.organization.length === 0 ||
            this.state.streetAddress.length === 0 ||
            this.state.city.length === 0 ||
            this.state.state.length === 0 ||
            this.state.zipcode.length === 0 ||
            this.state.adminUserName.length === 0
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
        else if (!postalCodeValidator(this.state.zipcode)) {
            this.setState({error: 'Enter a valid postal code'})
            return false
        }
        else if (this.state.isNonProfit === true && this.state.ein.length === 9) {
            this.setState({ error: 'Nonprofits must supply an valid EIN/BN/Tax ID' })
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
        else if (this.state.adminUserName === this.state.email) {
            this.setState({ error: 'Admin user name should not be the login email' })
            return false
        }
        else if (this.state.adminPassword.length <= 0) {
            this.setState({ error: 'Pleae enter an admin password' })
            return false
        }
        else if (this.state.adminConfirmPassword.length <= 0) {
            this.setState({ error: 'Please confirm your admin password' })
            return false
        }
        else if (this.state.adminPassword !== this.state.adminConfirmPassword) {
            this.setState({ error: 'Your admin passwords do not match' })
            return false
        }
        else if (!this.state.isTermsChecked) {
            this.setState({ error: 'You must agree to the terms of service' })
            return false
        }
        else {
            return true
        }
    }

    renderEIN = () => {
        return (
            <FormGroup
                label="EIN/BN/Tax ID"
                labelFor="text-input"
            >
                <InputGroup name="ein" onChange={this.handleChange} />
            </FormGroup>
        )
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
                            label="Street Address"
                            labelFor="text-input"
                        >
                            <InputGroup name="streetAddress" onChange={this.handleChange} />
                        </FormGroup>
                        <AddressRow>
                            <FormGroup
                                label="City"
                                labelFor="text-input"
                            >
                                <InputGroup name="city" onChange={this.handleChange} style={{width:'160px'}}/>
                            </FormGroup>
                            <FormGroup
                                label="Zipcode"
                                labelFor="text-input"
                            >
                                <InputGroup name="zipcode" onChange={this.handleChange} style={{width: '80px'}} maxLength='6'/>
                            </FormGroup>
                            <FormGroup
                                label="State"
                                labelFor="text-input"
                            >
                                <InputGroup name="state" onChange={this.handleChange} style={{width: '50px'}} maxLength='2'/>
                            </FormGroup>
                        </AddressRow>
                        <FormGroup
                            label="Phone"
                            labelFor="text-input"
                        >
                            <InputGroup name="phone" onChange={this.handleChange} />
                        </FormGroup>
                        <NonprofitContainer>
                            <CheckboxContainer>Is Your Organization A Nonprofit?
                                <SignUpCheckbox checked={this.state.isNonProfit} onChange={this.handleCheckedChange} name='isNonProfit' inline={true} />
                            </CheckboxContainer>
                            {this.state.isNonProfit ? this.renderEIN() : ''}
                        </NonprofitContainer>
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
                            <InputGroup name="adminUserName" onChange={this.handleChange} />
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
                        <CheckboxContainer>I accept the
                            <a onClick={this.handleTermsOpen}> SAPO terms of service.</a>
                            <SignUpCheckbox checked={this.state.isTermsChecked} inline={true} onChange={this.handleCheckedChange} name='isTermsChecked' />
                        </CheckboxContainer>
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

const AddressRow = styled.div`
    display: flex;
    justify-content: space-between;
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

const NonprofitContainer = styled.div`
    margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
    margin-top: 10px;
`;

const SignUpCheckbox = styled(Checkbox)`
    margin-left: 10px;
`

export default withRouter(SignUp);