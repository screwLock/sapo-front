import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, H5, Intent} from '@blueprintjs/core'
import { Elements, StripeProvider } from 'react-stripe-elements';
import { format } from 'date-fns'
import PayForm from './PayForm'
import config from '../../../config'

class Unpaid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isBillingOpen: false,
        }
    }

    handleChangeOpen = () => {
        this.setState({ isBillingOpen: !this.state.isBillingOpen })
    }

    render() {
        const nextStatement = this.props.nextStatement;
        const prices = {
            'SAPO Basic': '$59.99',
            'SAPO Standard': '$149.99',
            'SAPO Premium': '$199.99',
            'Canceled': 'Canceled ($0.00)'
        }
        const membership = this.props.membership
        return (
            <Container>
                <BillingInfoRow><H5>Current Membership Level: {membership.toUpperCase()}</H5></BillingInfoRow>
                <BillingInfoRow><H5>Next Statement Date: {format(new Date(nextStatement*1000), 'MM/DD/YYYY')}</H5></BillingInfoRow>
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
                        <PayForm
                            {...this.props}
                            isOpen={this.state.isBillingOpen}
                            handleOpen={this.handleChangeOpen}
                        />
                    </Elements>
                </StripeProvider>
            </Container>

        )
    }
}

const Container =  styled.div`
    margin: 25px;
`

const MembButtonRow = styled.div`
    margin-top: 25px;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 400px;
`

const BillingInfoRow = styled.div`
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
`

export default Unpaid;