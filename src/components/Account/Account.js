import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, H5, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { Elements, StripeProvider } from 'react-stripe-elements';
import BillingForm from './BillingForm'

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
        return (
            <Container>
                <H3>Manage Account Info</H3>
                <H5>Current Membership Level: {this.props.authData.signInUserSession.idToken.payload['custom:membership'].toUpperCase()}</H5>
                <Button 
                    onClick={this.handleOpen}
                    text='Change Membership'
                />
                <StripeProvider apiKey='pk_test_ZokTubwC6G4D2q2COo4Gj9O4'>
                    <Elements>
                        <BillingForm 
                            isOpen={this.state.isBillingOpen}
                            handleOpen={this.handleOpen}
                        />
                    </Elements>
                </StripeProvider>
            </Container>

        )
    }
}

const Container = styled.div`
  margin: 25px;
`

export default Account;