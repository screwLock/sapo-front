import * as React from 'react'
import { AppToaster } from '../Toaster'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { API, Auth } from "aws-amplify"
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog, Radio, RadioGroup } from "@blueprintjs/core"
import styled from 'styled-components'

class BillingForm extends React.Component {
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
        this.setState({ isProcessing: true });
        // create the Stripe source
        let source = await this.props.stripe.createSource({
            type: 'card',
            owner: {
                name: this.state.cardholderName,
                email: this.props.authData.signInUserSession.idToken.payload.email
            },

        })
        if (source) {
            const postBody = {
                stripeSourceId: source.source.id,
            };
            // Here you POST the above body to link source to customer in the backend (see below)
        }
        this.setState({ isProcessing: false });
        // this.props.authData.signInUserSession.idToken.payload['custom:stripeID'] == 'NA') 
        // if stripeID ==='NA', then create customer id with this.props.stripe.customers.create()
        // let user = await Auth.currentAuthenticatedUser();
        /* Auth.updateUserAttributes(user, {
                'custom:stripeID': `newID`,
                'custom:membership': 'membership',
              }).then(
        */
        // then store the new id in cognito
        this.showToast('Card successfully charged')
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    validateForm = () => {
        return (
            this.state.plan.length > 0 &&
            this.state.isCardComplete &&
            this.state.cardholderName.length > 0
        );
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
                            <Radio label="Bronze" value="Bronze" />
                            <Radio label="Silver" value="Silver" />
                            <Radio label="Gold" value="Gold" />
                        </RadioGroup>
                    </CardRow>
                    <CardRow>
                        <FormGroup
                            label="Cardholder's Name"
                            labelFor="text-input"
                        >
                            <InputGroup name="cardholderName" type="text" onChange={this.onChange} />
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

export default injectStripe(BillingForm);
