import * as React from 'react'
import styled from 'styled-components'
import { Button, H5, Intent } from '@blueprintjs/core'
import { format } from 'date-fns'
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
            'SAPO Basic': '$59.99',
            'SAPO Standard': '$149.99',
            'SAPO Premium': '$199.99',
            'Canceled': 'Canceled ($0.00)'
        }
        const membership = this.props.membership
        const href = `https://schedule.sapopros.com/?id=${this.props.authData.username}`
        return (
            <React.Fragment>
                <BillingInfoRow><H5>Current Membership Level: {membership.toUpperCase()}</H5></BillingInfoRow>
                <BillingInfoRow><H5>Next Statement Date: {format(new Date(this.props.nextStatement*1000), 'MM/DD/YYYY')}</H5></BillingInfoRow>
                <BillingInfoRow><H5>Monthly Cost: {`${prices[membership]}`}</H5></BillingInfoRow>
                <MembButtonRow>
                    <Button
                        onClick={this.handleChangeOpen}
                        text='Change Membership'
                        intent={Intent.PRIMARY}
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
                <URL>Your URL for your scheduling page: <a href={href} target="_blank">https://schedule.sapopros.com/?id={this.props.authData.username}</a></URL>
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