import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Checkbox, FormGroup, InputGroup } from "@blueprintjs/core"
import { Auth } from "aws-amplify"
import { Redirect, withRouter } from "react-router-dom"
import * as EmailValidator from 'email-validator'
import Terms from './Terms'
import { postalCodeValidator } from '../Zipcodes/postalCodeValidator'
import Logo from './Logo'

class SignUp extends React.Component {
    static defaultProps = {
        authData: {},
        authState: false,
        // onAuthStateChange: (next, data) => { console.log(`SignUp:onAuthStateChange(${next}, ${JSON.stringify(data, null, 2)})`); }
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
        if (this.state.ein.length === 0 && this.state.isNonProfit === false) {
            ein = 'NA'
        }
        try {
            this.setState({ loading: true });
            const response = await Auth.signUp({
                username: this.state.email,
                password: this.state.password,
                attributes: {
                    phone_number: `+${this.state.phone.replace(/[^A-Za-z0-9]/g, '')}`,
                    // we'll use the name standard attribute for organization name
                    name: this.state.organization,
                    given_name: this.state.firstName,
                    family_name: this.state.lastName,
                    // we'll combine all the address parameters into one attribute field
                    address: `${this.state.streetAddress}@${this.state.city}@${this.state.state}@${this.state.zipcode.replace(/[^A-Za-z0-9]/g, '')}`,
                    updated_at: Date.now().toString(),
                    'custom:isNonProfit': this.state.isNonProfit.toString(),
                    'custom:ein': ein.replace(/[^a-zA-Z0-9-_]+/g, ''),
                    'custom:membership': 'trial',
                    'custom:stripeID': '-',
                    'custom:LatLng': '@',
                    'custom:adminUserName1': Math.random().toString(36).replace('0.', ''),
                    'custom:adminPassword1': Math.random().toString(36).replace('0.', ''),
                    'custom:adminUserName2': Math.random().toString(36).replace('0.', ''),
                    'custom:adminPassword2': Math.random().toString(36).replace('0.', ''),
                    'custom:adminUserName3': Math.random().toString(36).replace('0.', ''),
                    'custom:adminPassword3': Math.random().toString(36).replace('0.', ''),
                    'custom:adminUserName4': Math.random().toString(36).replace('0.', ''),
                    'custom:adminPassword4': Math.random().toString(36).replace('0.', ''),
                    'custom:adminUserName5': Math.random().toString(36).replace('0.', ''),
                    'custom:adminPassword5': Math.random().toString(36).replace('0.', ''),
                    'custom:createdAt': new Date().toISOString(),
                }
            });
            // console.log(`SignUp::onSignUp(): Response#1 = ${JSON.stringify(response, null, 2)}`);
            if (response.userConfirmed === false) {
                this.setState({ authData: response, modalShowing: true, loading: false, successShowing: true });
            } else {
                this.onAuthStateChange('default', { username: response.username });
            }
        } catch (err) {
            // console.log(`SignUp::onSignUp(): Error ${JSON.stringify(err, null, 2)}`);
            this.setState({ error: err.message, loading: false });
        }
    }

    onConfirmSubmitted = async (token) => {
        try {
            this.setState({ loading: true });
            const response = await Auth.confirmSignUp(this.state.email, token);
            // console.log(`SignUp::onConfirmSubmitted(): Response#2 = ${JSON.stringify(response, null, 2)}`);
            this.setState({ loading: false });
            if (response === 'SUCCESS') {
                this.props.onAuthStateChange('default', { email: this.state.email });
            }
        } catch (err) {
            // console.log(`SignUp::onConfirmSubmitted(): Error ${JSON.stringify(err, null, 2)}`);
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
            this.state.zipcode.length === 0
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
            this.setState({ error: 'Enter a valid postal code' })
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
        const errorComponent = (this.state.error !== null && !this.state.successShowing)
            ? this.state.error
            : '';


        return (
            <div>
                <Container>
                    {/*this.state.error !== null && errorComponent*/}
                    <FormContainer>
                        <StyledLogo><Logo mass={10}/></StyledLogo>
                        <FormGroup
                            label="First Name"
                            labelFor="text-input"
                        >
                            <InputGroup name="firstName" autoFocus onChange={this.handleChange} />
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
                            label="Organization Street Address"
                            labelFor="text-input"
                            helperText="This is the address that will be used for routing"
                        >
                            <InputGroup name="streetAddress" onChange={this.handleChange} />
                        </FormGroup>
                        <AddressRow>
                            <FormGroup
                                label="City"
                                labelFor="text-input"
                            >
                                <InputGroup name="city" onChange={this.handleChange} style={{ width: '160px' }} />
                            </FormGroup>
                            <FormGroup
                                label="Zipcode"
                                labelFor="text-input"
                            >
                                <InputGroup name="zipcode" onChange={this.handleChange} style={{ width: '80px' }} maxLength='6' />
                            </FormGroup>
                            <FormGroup
                                label="State"
                                labelFor="text-input"
                            >
                                <InputGroup name="state" onChange={this.handleChange} style={{ width: '50px' }} maxLength='2' />
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

const StyledLogo = styled.div`
    font-size:50px;
    font-weight: bold;
    text-align: center;
    padding: 20px 20px 0;
    margin:0;
    display: inline-flex;
    justify-content: center;
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