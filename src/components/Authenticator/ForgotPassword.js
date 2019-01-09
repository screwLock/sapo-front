import * as React from 'react'
import styled from 'styled-components'
import { Button, Classes, FormGroup, Icon, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import { Auth } from "aws-amplify"
import { Link, withRouter } from "react-router-dom";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      password: "",
      codeSent: false,
      confirmed: false,
      confirmPassword: "",
      isConfirming: false,
      isSendingCode: false
    };
  }

  validateCodeForm() {
    return this.state.email.length > 0;
  }

  validateResetForm() {
    return (
      this.state.code.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleBack = () => {
    this.props.history.push('/')
}

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSendCodeClick = async event => {

    this.setState({ isSendingCode: true });

    try {
      await Auth.forgotPassword(this.state.email);
      this.setState({ codeSent: true, isSendingCode: false });
    } catch (e) {
      alert(e.message);
      this.setState({ isSendingCode: false });
    }
  };

  handleConfirmClick = async event => {
    event.preventDefault();

    this.setState({ isConfirming: true });

    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.code,
        this.state.password
      );
      this.setState({ confirmed: true, isConfirming: false });
    } catch (e) {
      alert(e.message);
      this.setState({ isConfirming: false });
    }
  };

  renderRequestCodeForm() {
    return (
      <div>
        <FormGroup
          label="Enter Your Email"
          labelFor="text-input"
        >
          <InputGroup name="email" onChange={this.handleChange} />
        </FormGroup>
        <ButtonRow>
          <Button
            loading={this.state.isSendingCode}
            onClick={this.handleSendCodeClick}
            text="Send Confirmation"
          />
          <Button
            loading={this.state.isConfirming}
            onClick={this.handleBack}
            text="Back"
          />
        </ButtonRow>
      </div>
    );
  }

  renderConfirmationForm() {
    return (
      <div>
        <FormGroup
          label="Enter The Confirmation Code"
          labelFor="text-input"
        >
          <InputGroup name="code" value={this.state.code} onChange={this.handleChange} />
        </FormGroup>
        <hr />
        <FormGroup
          label="Enter Password"
          labelFor="text-input"
        >
          <InputGroup name="password" onChange={this.handleChange} type='password' />
        </FormGroup>
        <FormGroup
          label="Confirm Password"
          labelFor="text-input"
        >
          <InputGroup name="confirmPassword" onChange={this.handleChange} type='password'/>
        </FormGroup>

        <ButtonRow>
          <Button
            loading={this.state.isConfirming}
            onClick={this.handleConfirmClick}
            text="Send Confirmation"
          />
        </ButtonRow>
      </div>
    );
  }

  renderSuccessMessage() {
    return (
      <div>
        <p><Icon icon='thumbs-up' /> Your password has been reset.</p>
        <p>
          <Link to="/signIn">
            Click here to login with your new credentials.
          </Link>
        </p>
      </div>
    );
  }

  render() {
    return (
      <Container>
        <FormContainer>
          <Logo>SAPO</Logo>
          {!this.state.codeSent
            ? this.renderRequestCodeForm()
            : !this.state.confirmed
              ? this.renderConfirmationForm()
              : this.renderSuccessMessage()}
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

export default withRouter(ForgotPassword);