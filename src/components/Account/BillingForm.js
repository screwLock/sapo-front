import * as React from 'react'
import { AppToaster } from '../Toaster'
import { CardElement, injectStripe } from 'react-stripe-elements'
import { Button, Classes, FormGroup, H3, InputGroup, Intent, Dialog, Radio, RadioGroup } from "@blueprintjs/core"
import styled from 'styled-components'

class BillingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: "",
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

    handleSubmitClick = async event => {
        event.preventDefault();
        // this.setState({ isProcessing: true });
        // const { token, error } = await this.props.stripe.createToken({ name });
        // this.setState({ isProcessing: false });
        // this.props.onSubmit(this.state.storage, { token, error });
        // this.showToast('Card successfully charged')
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    validateForm = () => {
        return (
            this.state.plan !== "" &&
            this.state.isCardComplete
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
                    <PlanRadioGroup
                        label="Choose A MemberShip"
                        onChange={this.handleChange}
                        selectedValue={this.state.plan}
                        name='plan'
                        inline={true}
                    >
                        <Radio label="Bronze" value="Bronze" />
                        <Radio label="Silver" value="Silver" />
                        <Radio label="Gold" value="Gold" />
                    </PlanRadioGroup>
                    <CardElement
                        onChange={this.handleCardFieldChange}
                        style={{
                            base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
                        }}
                    />
                </DialogContainer>
                <div className={Classes.DIALOG_FOOTER}>
                    <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                        <Button onClick={this.props.handleOpen}>Cancel</Button>
                        <Button onClick={this.handleSubmit} intent={Intent.PRIMARY}>Submit</Button>
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

const PlanRadioGroup = styled(RadioGroup)`
    margin-bottom: 10px;
`

export default injectStripe(BillingForm);
