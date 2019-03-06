import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import { Elements, StripeProvider } from 'react-stripe-elements';
import BillingForm from './BillingForm'

class Account extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <Container>
                <H3>Manage Account Info</H3>
                <StripeProvider apiKey='pk_test_ZokTubwC6G4D2q2COo4Gj9O4'>
                    <Elements>
                        <BillingForm />
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