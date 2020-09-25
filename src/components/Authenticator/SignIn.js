import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, FormGroup, InputGroup } from "@blueprintjs/core"
import { Auth } from "aws-amplify"
import { Link, withRouter } from "react-router-dom";

class SignIn extends React.Component {
    static defaultProps = {
        authData: {},
        authState: 'false',
        // onAuthStateChange: (next, data) => { console.log(`SignIn:onAuthStateChange(${next}, ${JSON.stringify(data, null, 2)})`); }
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
            // console.log(`onSignIn::Response#1: ${JSON.stringify(data, null, 2)}`);
            if (data.signInUserSession === null) {
                this.setState({ user: data, loading: false, modalShowing: true });
            } else {
                //  localStorage.setItem('user', response.data)
                this.props.onAuthStateChange(true, data);
                this.props.history.push('/')
            }
        } catch (err) {
            // console.log(`Error: ${JSON.stringify(err, null, 2)}`);
            this.setState({ error: err.message, loading: false });
        }
    }

    handleSignIn = () => {
        if (this.validateForms() === false) {
            this.setState({ error: 'Please Enter a Username and Password' })
        }
        else {
            this.onSignIn();
        }
    }

    onConfirmSignin = async (token) => {
        this.setState({ loading: true });
        try {
            // console.log(`onConfirmSignIn:: ${this.state.email}, ${token}`);
            // const data = await Auth.confirmSignIn(this.state.user, token);
            // console.log(`onConfirmSignIn::Response#2: ${JSON.stringify(data, null, 2)}`);
            const profile = await Auth.currentUser();
            this.props.onAuthStateChange(true, profile);
        } catch (err) {
            // console.log('Error: ', err);
            this.setState({ error: err.message, loading: false });
            this.setErrorText(err.code);
        }
    }

    validateForms = () => {
        return this.state.email.length > 0 && this.state.password.length > 0
    }

    render() {
        const errorComponent = this.state.error !== null
            ? this.state.error
            : '';

        return (
            <Container>
                <FormContainer>
                    <Logo>SAPO</Logo>
                    <FormGroup
                        label="Email"
                        labelFor="text-input"
                    >
                        <InputGroup name="email" placeholder="youremail@example.org" autoFocus onChange={this.onChange} />
                    </FormGroup>
                    <FormGroup
                        label="Password"
                        labelFor="text-input"
                    >
                        <InputGroup name="password" type="password" placeholder="********" onChange={this.onChange} />
                    </FormGroup>
                    <ButtonRow>
                        <Button
                            loading={this.state.loading}
                            onClick={this.handleSignIn}
                        >
                            Sign In
                        </Button>
                    </ButtonRow>
                    <ErrorContainer>{`${errorComponent}`}</ErrorContainer>
                    <SignUpContainer>Don't have an account?
                        <Link to='/signUp'> Sign Up</Link>
                        <div><Link to='/forgotPassword'>Forgot Password?</Link></div>
                    </SignUpContainer>
                </FormContainer>
            </Container>
        );
    }
}

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

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
    animation: ${fadeIn} 1s ease-in;
    opacity: 1;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

const SignUpContainer = styled.div`
    margin-top: 10px;
`;

const ErrorContainer = styled.p`
    color:red;
`;

export default withRouter(SignIn);