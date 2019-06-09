import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, H5, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { Elements, StripeProvider } from 'react-stripe-elements';
import BillingForm from './BillingForm'
import CancelDialog from './CancelDialog'
import config from '../../config'

class Billing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isBillingOpen: false,
            isCancelOpen: false
        }
    }

    handleChangeOpen = () => {
        this.setState({ isBillingOpen: !this.state.isBillingOpen })
    }

    handleCancelOpen = () => {
        this.setState({ isCancelOpen: !this.state.isCancelOpen })
    }

    render() {
        const prices = {
            basic: '$90.00',
            standard: '$149.99',
            premium: '$199.00'
        }
        const membership = this.props.authData.signInUserSession.idToken.payload['custom:membership']
        const href = `https://donate.sapopros.com/?id=${this.props.authData.username}`
        return (
            <React.Fragment>
                <BillingInfoRow><H5>Current Membership Level: {membership.toUpperCase()}</H5></BillingInfoRow>
                <BillingInfoRow><H5>Next Statement Date:</H5></BillingInfoRow>
                <BillingInfoRow><H5>Monthly Cost: {`${prices[membership]}`}</H5></BillingInfoRow>
                <MembButtonRow>
                    <Button
                        onClick={this.handleChangeOpen}
                        text='Change Membership'
                    />
                </MembButtonRow>
                <StripeProvider apiKey={config.STRIPE_KEY}>
                    <Elements>
                        <BillingForm
                            {...this.props}
                            isOpen={this.state.isBillingOpen}
                            handleOpen={this.handleChangeOpen}
                        />
                    </Elements>
                </StripeProvider>
                <CancelDialog
                    {...this.props}
                    isOpen={this.state.isCancelOpen}
                    handleOpen={this.handleCancelOpen}
                />
                <URL>Your URL for your scheduling page: <a href={href} target="_blank">https://donate.sapopros.com/?id={this.props.authData.username}</a></URL>
                <CancelButtonRow>
                    <Button
                        onClick={this.handleCancelOpen}
                        text='Cancel Membership'
                        intent={Intent.DANGER}
                    />
                </CancelButtonRow>
            </React.Fragment>

        )
    }
}

const URL = styled.div`
    margin-top: 25px;
`
const MembButtonRow = styled.div`
    margin-top: 25px;
`

const CancelButtonRow = styled.div`
    display: flex;
    flex-direction: row-reverse;
`

const BillingInfoRow = styled.div`
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
`

export default Billing;