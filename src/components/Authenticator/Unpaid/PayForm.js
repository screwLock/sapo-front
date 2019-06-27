import * as React from 'react'
import { AppToaster } from '../../Toaster'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { API } from "aws-amplify"
import { Button, Classes, FormGroup, InputGroup, Intent, Dialog, Radio, RadioGroup } from "@blueprintjs/core"
import styled from 'styled-components'

class PayForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: "",
            cardholderName: '',
            isProcessing: false,
            isCardComplete: false
        };
    }

    handleCardFieldChange = event => {
        this.setState({
            isCardComplete: event.complete
        });
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = async event => {
        event.preventDefault();
        if (!this.validateForm()) {
            return
        }
        this.setState({ isProcessing: true });
        // create the Stripe source
        try {
            let source = await this.props.stripe.createSource({
                type: 'card',
                owner: {
                    name: this.state.cardholderName,
                    email: this.props.authData.signInUserSession.idToken.payload.email
                },

            })
            // exit if a source was not created
            if (source == null) {
                this.setState({ isProcessing: false })
                this.showToast('There was an error creating the source')
                return false
            }
            const postBody = {
                source: source.source.id,
                email: this.props.authData.signInUserSession.idToken.payload.email,
                plan: this.state.plan,
                customer: this.props.authData.signInUserSession.idToken.payload['custom:stripeID'],
                subscription: this.props.authData.signInUserSession.idToken.payload['custom:subscriptionID'],
            };
            await API.post("sapo", "/billing", {
                body: postBody
            })
            this.setState({
                isProcessing: false,
                cardholderName: '',
                isCardComplete: false,
                plan: 'basic'
            }, () => {
                this.props.handleOpen();
                this.props.updateCustomerInfo()
            }
            );
            this.showToast('Card successfully charged')
        } catch (error) {
            this.setState({
                isProcessing: false,
                cardholderName: '',
                isCardComplete: false,
                plan: 'basic'
            }, () => this.props.handleOpen());
            this.showToast(`Charge Failed. Error with Status Code ${error.response.status}`)

        }
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    validateForm = () => {
        if (this.state.plan.length > 0 && this.state.isCardComplete && this.state.cardholderName.length > 0) {
            return true
        }
        else {
            this.showToast('All fields are required')
            return false
        }
    }

    render() {
        return (
            <Dialog
                onClose={this.props.handleOpen}
                title="Change MemberShip"
                isOpen={this.props.isOpen}
            >
                <DialogContainer>
                    <CardRow>
                        <RadioGroup
                            label="Choose A MemberShip"
                            onChange={this.handleChange}
                            selectedValue={this.state.plan}
                            name='plan'
                            inline={true}
                        >
                            <Radio label="Basic" value="basic" />
                            <Radio label="Standard" value="standard" />
                            <Radio label="Premium" value="premium" />
                            <Radio label="Cancel" value="canceled" />
                        </RadioGroup>
                    </CardRow>
                    <CardRow>
                        <FormGroup
                            label="Cardholder's Name"
                            labelFor="text-input"
                        >
                            <InputGroup name="cardholderName" type="text" onChange={this.handleChange} />
                        </FormGroup>
                    </CardRow>
                    <CardElementRow>
                        <CardElement
                            onChange={this.handleCardFieldChange}
                            style={{
                                base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
                            }}
                        />
                    </CardElementRow>
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

const CardRow = styled.div`
    margin-bottom: 10px;
    margin-top: 10px;
    width: 75%;
`

const CardElementRow = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`

export default injectStripe(PayForm);
