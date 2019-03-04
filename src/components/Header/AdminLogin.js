import * as React from 'react'
import { Button, Classes, Dialog, FormGroup, InputGroup, Intent } from "@blueprintjs/core"
import styled from 'styled-components'
import { AppToaster } from '../Toaster'

class AdminLogin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    authenticateAdmin = () => {
        if(this.state.email === 'admin' && this.state.password === 'admin'){
            this.props.onAdminLogin()
        }
        else {
            this.showToast('Incorrect email or password')
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
                        label="Admin Email"
                    >
                        <InputGroup name='email' onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup
                        label="Admin Password"
                    >
                        <InputGroup name="password" type='password' onChange={this.handleChange} />
                    </FormGroup>
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

export default AdminLogin;