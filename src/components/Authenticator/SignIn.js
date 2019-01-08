import * as React from 'react'
import styled from 'styled-components'
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import { Auth } from "aws-amplify"
import { Redirect, withRouter } from "react-router-dom";

class SignIn extends React.Component {
    static defaultProps = {
        authData: {},
        authState: 'SignIn',
        onAuthStateChange: (next, data) => { console.log(`SignIn:onAuthStateChange(${next}, ${JSON.stringify(data, null, 2)})`); }
    };

    constructor(props) {
        super(props);
        this.state = {
            authData: this.props.authData,
            authState: this.props.authState,
            loading: false,
            error: null,
            email: this.props.authData.email || '',
            password: this.props.authData.password || '',
            user: null
        };
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })

    onSignIn = async () => {
        this.setState({ loading: true });
        try {
            const data = await Auth.signIn(this.state.email, this.state.password);
            console.log(`onSignIn::Response#1: ${JSON.stringify(data, null, 2)}`);
            if (data.signInUserSession === null) {
                this.setState({ user: data, loading: false, modalShowing: true });
            } else {
                this.props.onAuthStateChange('authenticated', data);
                this.props.history.push('/')
            }
        } catch (err) {
            console.log(`Error: ${JSON.stringify(err, null, 2)}`);
            this.setState({ error: err.message, loading: false });
        }
    }

    onConfirmSignin = async (token) => {
        this.setState({ loading: true });
        try {
            console.log(`onConfirmSignIn:: ${this.state.email}, ${token}`);
            const data = await Auth.confirmSignIn(this.state.user, token);
            console.log(`onConfirmSignIn::Response#2: ${JSON.stringify(data, null, 2)}`);
            const profile = await Auth.currentUser();
            this.props.onAuthStateChange('authenticated', profile);
        } catch (err) {
            console.log('Error: ', err);
            this.setState({ error: err.message, loading: false });
            this.setErrorText(err.code);
        }
    }

    onSignUpClick = () => {
        this.props.onAuthStateChange('signUp', {});
    }


    render() {
        let settings = {
            // Fill in props for individual components here
            // submitButtonLoading: {}
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
                        label="Email"
                        labelFor="text-input"
                    >
                        <InputGroup name="email" placeholder="youremail@example.org" onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="text-input"
                    >
                        <InputGroup name="password" type="password" placeholder="********" onChange={this.onChange} />
                    </FormGroup>
                    <ButtonRow>
                        <Button
                            {...(this.state.loading ? settings.submitButtonLoading : settings.submitButton)}
                            onClick={this.onSignIn}
                        >
                            Sign In
                        </Button>
                    </ButtonRow>
                    <SignUpContainer>Don't have an account?  <a onClick={this.onSignUpClick}>
                        Sign Up</a>
                    </SignUpContainer>
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

const SignUpContainer = styled.div`
    margin-top: 10px;
`;

export default withRouter(SignIn);