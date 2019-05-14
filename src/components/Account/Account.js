import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, H5, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { Elements, StripeProvider } from 'react-stripe-elements';
import BillingForm from './BillingForm'
import config from '../../config'

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isBillingOpen: false
        }
    }

    handleOpen = () => {
        this.setState( {isBillingOpen : !this.state.isBillingOpen} )
    }

    render() {
        const href=`donate.sapopros.com/?id=${this.props.authData.username}`
        return (
            <Container>
                <H3>Manage Account Info</H3>
                <BillingInfoRow><H5>Current Membership Level: {this.props.authData.signInUserSession.idToken.payload['custom:membership'].toUpperCase()}</H5></BillingInfoRow>
                <BillingInfoRow><H5>Next Statement Date:</H5></BillingInfoRow>
                <BillingInfoRow><H5>Monthly Cost:</H5></BillingInfoRow>
                <Button 
                    onClick={this.handleOpen}
                    text='Change Membership'
                />
                <StripeProvider apiKey={config.STRIPE_KEY}>
                    <Elements>
                        <BillingForm
                            {...this.props} 
                            isOpen={this.state.isBillingOpen}
                            handleOpen={this.handleOpen}
                        />
                    </Elements>
                </StripeProvider>
                <div>Your URL for your scheduling page: <a href={href} target="_blank">https://donate.sapopros.com/?id={this.props.authData.username}</a></div>
            </Container>

        )
    }
}

const Container = styled.div`
    margin: 25px;
`

const BillingInfoRow = styled.div`
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
`

export default Account;