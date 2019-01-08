import * as React from 'react'
import styled from 'styled-components'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import { Auth } from "aws-amplify"

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
        firstName: '',
        lastName: '',
        organization: '',
        email: '',
        phone: '',
        password: '',
        password2: '',
      };
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
   
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
          this.setState({ authData: response, modalShowing: true, loading: false });
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

    render() {
        let settings = {
            // Fill in props for individual components here
        };

        const errorComponent = this.state.error !== null
            ? this.state.error
            : false;

        return (
            <Container>
                {/*this.state.error !== null && errorComponent*/}
                <FormContainer>
                    <Logo>SAPO</Logo>
                    <FormGroup
                        label="First Name"
                        labelFor="text-input"
                    >
                        <InputGroup name="firstName" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Last Name"
                        labelFor="text-input"
                    >
                        <InputGroup name="lastName" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Email"
                        labelFor="text-input"
                    >
                        <InputGroup name="email" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Organization"
                        labelFor="text-input"
                    >
                        <InputGroup name="organization" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Phone"
                        labelFor="text-input"
                    >
                        <InputGroup name="phone" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="text-input"
                    >
                        <InputGroup name="password" onChange={this.onChange}/>
                    </FormGroup>
                    <FormGroup
                        label="Re-enter Password"
                        labelFor="text-input"
                    >
                        <InputGroup name="password2" onChange={this.onChange}/>
                    </FormGroup>
                    <TermsContainer>I accept the SAPO terms of service.</TermsContainer>
                    <ButtonRow>
                        <Button
                            {...(this.state.loading ? settings.submitButtonLoading : settings.submitButton)}
                            onClick={this.onSignUp}
                        >
                            Sign Up
                        </Button>
                    </ButtonRow>
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

const TermsContainer = styled.div`
    margin-top: 10px;
`;

export default SignUp;