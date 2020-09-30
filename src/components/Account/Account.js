import * as React from 'react'
import styled from 'styled-components'
import { H3, Tab, Tabs } from '@blueprintjs/core'
import Billing from './Billing'
import Admin from './Admin'
import Branding from './Branding'

class Account extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTabId: 'billing' 
        }
    }

    handleTabChange = (newTabId) => {
        this.setState({activeTabId: newTabId})
    }

    render() {
        return (
            <Container>
                <H3>Manage Account Info</H3>
                <Tabs id="TabsAdmin" onChange={this.handleTabChange} selectedTabId={this.state.activeTabId}>
                    <Tab id="billing" title="Billing" panel={<Billing {...this.props}/>} />
                    <Tab id='admin' title="Admin" panel={<Admin {...this.props}/>}/>
                    <Tab id='branding' title="Branding" panel={<Branding {...this.props}/>}/>
                </Tabs>
            </Container>

        )
    }
}

const Container = styled.div`
    margin: 25px;
`

export default Account;