import * as React from 'react'
import { Button, Classes, Dialog, FormGroup, InputGroup, Intent } from "@blueprintjs/core"
import styled from 'styled-components'
import { AppToaster } from '../Toaster'

class AdminLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    authenticateAdmin = () => {
        let payload = this.props.authData.signInUserSession.idToken.payload
        if ((this.state.username === payload['custom:adminUserName1'] && this.state.password === payload['custom:adminPassword1']) ||
            (this.state.username === payload['custom:adminUserName2'] && this.state.password === payload['custom:adminPassword2']) ||
            (this.state.username === payload['custom:adminUserName3'] && this.state.password === payload['custom:adminPassword3']) ||
            (this.state.username === payload['custom:adminUserName4'] && this.state.password === payload['custom:adminPassword4']) ||
            (this.state.username === payload['custom:adminUserName5'] && this.state.password === payload['custom:adminPassword5'])
        ) {
            this.props.onAdminLogin()
        }
        else {
            this.showToast('Incorrect username or password')
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = () => {
        this.authenticateAdmin()
        this.props.onOpen()
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    render() {
        return (
            <Dialog isOpen={this.props.isOpen}
                title='Administrator Login'
                onClose={this.props.onOpen}
            >
                <DialogContainer>
                    <FormGroup
                        label="Admin Username"
                    >
                        <InputGroup name='username' onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup
                        label="Admin Password"
                    >
                        <InputGroup name="password" type='password' onChange={this.handleChange} />
                    </FormGroup>
                    {/*<ForgotPassword>Forgot Your Password?</ForgotPassword>*/}
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.onClose}>Cancel</Button>
                        <Button onClick={this.handleSubmit} intent={Intent.PRIMARY}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        )
    }
}

const DialogContainer = styled.div`
    width: 250px;
    margin: 20px;
`

const ForgotPassword = styled.a`
    margin: 10px;
    font-size: 12px;
    font-style: italic;
`

export default AdminLogin;