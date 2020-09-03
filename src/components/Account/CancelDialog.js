import * as React from 'react'
import { AppToaster } from '../Toaster'
import { API } from "aws-amplify"
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog } from "@blueprintjs/core"
import styled from 'styled-components'

class CancelDialog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cancelText: '',
            isProcessing: false,
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleOpen = () => {
        this.setState({cancelText: ''}, () => {
            this.props.handleOpen()
        })
    }

    handleSubmit = async event => {
        const customerId = this.props.authData.signInUserSession.idToken.payload['custom:stripeID']
        const subscription = this.props.authData.signInUserSession.idToken.payload['custom:subscriptionID'] 
        event.preventDefault();
        if (!this.validateForm()) {
            return
        }
        else if(customerId === '-'){
            this.showToast('You do not have an active Stripe subscription')
            return
        }
        this.setState({ isProcessing: true });

        try {
            const postBody = {
                customer: customerId,
                subscription: subscription,
            };
            await API.put("sapo", "/billing", {
                body: postBody
            })
            this.setState({
                isProcessing: false,
            }, () => {
                this.handleOpen();
                this.props.updateCustomerInfo();
            });
            this.showToast('Account canceled')
        } catch (error) {
            this.setState({
                isProcessing: false,
            }, () => this.handleOpen());
            this.showToast(`Cancel Subscription Failed with Status Code ${error.response.status}.`)

        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    validateForm = () => {
        if (this.state.cancelText === 'Cancel SAPO') {
            return true
        }
        else {
            this.showToast('You must enter Cancel SAPO into the input form ')
            return false
        }
    }

    render() {
        return (
            <Dialog
                onClose={this.props.handleOpen}
                title="Cancel MemberShip"
                isOpen={this.props.isOpen}
            >
                <DialogContainer>
                    <FormGroup>
                        <Cancel>Type 'Cancel SAPO' to cancel your membership.</Cancel>
                        <InputGroup name="cancelText" type="text" onChange={this.handleChange} />
                    </FormGroup>
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleOpen} loading={this.state.isProcessing}>Cancel</Button>
                        <Button onClick={this.handleSubmit} intent={Intent.PRIMARY} loading={this.state.isProcessing}>Submit</Button>
                    </div>
                </div>
            </Dialog>
        )
    }

}

const DialogContainer = styled.div`
    margin: 20px;
    margin-top: 10px;
`

const Cancel = styled.div`
    margin-top: 5px;
    margin-bottom: 25px;
    font-weight: bold;
`

export default CancelDialog;