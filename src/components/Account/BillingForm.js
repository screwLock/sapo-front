import * as React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'

class BillingForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            plan: "",
            isProcessing: false,
            isCardComplete: false
        };
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    validateForm = () => {
        return (
            this.state.name !== "" &&
            this.state.plan !== "" &&
            this.state.isCardComplete
        );
    }

    render() {
        return (
            <div>
                <CardElement
                    onChange={this.handleChange}
                    style={{
                        base: { fontSize: "18px", fontFamily: '"Open Sans", sans-serif' }
                    }}
                />
            </div>
        )
    }

}

export default injectStripe(BillingForm);
