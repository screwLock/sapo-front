import * as React from 'react'
import { H3, Tab, Tabs } from '@blueprintjs/core'
import styled from 'styled-components'
import SubmittedEmails from './SubmittedEmails'

class Emails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTabId: 'submitted' 
        }
    }

    handleTabChange = (newTabId) => {
        this.setState({activeTabId: newTabId})
    }

    render() {
        return (
            <Container>
                <H3>Manage Emails</H3>
                <Tabs id="TabsEmail" onChange={this.handleTabChange} selectedTabId={this.state.activeTabId}>
                    <Tab id="submitted" title="Submitted" panel={<SubmittedEmails {...this.props}/>} />
                    <Tab id="confirmed" title="Confirmed" panel={<SubmittedEmails {...this.props}/>} />
                    <Tab id="completed" title="Completed" panel={<SubmittedEmails {...this.props}/>} />
                </Tabs>
            </Container>
        )
    }


}

const Container = styled.div`
  margin: 25px;
`

export default Emails;