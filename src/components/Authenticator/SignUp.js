import * as React from 'react'
import styled from 'styled-components'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import { Auth } from "aws-amplify"
import { Redirect, withRouter } from "react-router-dom";

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
      };
    }

    handleBack = () => {
        this.props.history.push('/')
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSignUp = () => {
        if(this.validateForms() === false){
            this.setState({error: 'All fields are required'})
        }
        else if(this.validatePasswords() === false){
            this.setState({error: 'Passwords do not match'})
        }
        else {
            this.onSignUp()
        }
    }
   
    onSignUp = async () => {
      try {
        this.setState({ loading: true });
        const response = await Auth.signUp({
          username: this.state.email, 
          password: this.state.password, 
          /* attributes: {
            email: this.state.email, 
            phone_number: this.state.phone
          }
        */});
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
        return this.state.email.length > 0 && 
               this.state.password.length > 0 &&
               this.state.confirmPassword.length > 0 &&
               this.state.firstName.length > 0 &&
               this.state.lastName.length > 0 &&
               this.state.phone.length > 0 &&
               this.state.organization.length > 0
    }

    validatePasswords = () => {
        return this.state.password === this.state.confirmPassword
    }

    showSuccessMessage = () => {
        if(this.state.successShowing){
            return 'Sign up successful.  Please check your email and click the confirmation link to login.';
        }
    }

    render() {
        const errorComponent = this.state.error !== null
            ? this.state.error
            : '';
        

        return (
            <Container>
                {/*this.state.error !== null && errorComponent*/}
                <FormContainer>
                    <Logo>SAPO</Logo>
                    <FormGroup
                        label="First Name"
                        labelFor="text-input"
                    >
                        <InputGroup name="firstName" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Last Name"
                        labelFor="text-input"
                    >
                        <InputGroup name="lastName" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Email"
                        labelFor="text-input"
                    >
                        <InputGroup name="email" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Organization"
                        labelFor="text-input"
                    >
                        <InputGroup name="organization" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Phone"
                        labelFor="text-input"
                    >
                        <InputGroup name="phone" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="text-input"
                    >
                        <InputGroup name="password" onChange={this.handleChange} type='password'/>
                    </FormGroup>
                    <FormGroup
                        label="Confirm Password"
                        labelFor="text-input"
                    >
                        <InputGroup name="confirmPassword" onChange={this.handleChange} type='password'/>
                    </FormGroup>
                    <TermsContainer>I accept the SAPO terms of service.</TermsContainer>
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
        );
    }
}

const Container = styled.div`
    overflow: hidden;
    position: absolute;
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
`;

const Logo = styled.div`
    font-size:50px;
    font-weight: bold;
    text-align: center;
    padding: 20px 20px 0;
    margin:0;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
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

export default withRouter(SignUp);