import * as React from 'react'
import styled from 'styled-components'
import { Button, H3, Intent, Menu, MenuItem, Popover, Position, TextArea } from '@blueprintjs/core'
import produce from 'immer'


class Emails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: {}
        }
    }

    componentDidMount() {
        this.setState({
            email: []
        })
    }


    render() {
        return (
            <Container>
                <H3>Manage Emails</H3>
                <TextArea
                    large={true}
                    intent={Intent.PRIMARY}
                    //onChange={this.handleChange}
                    //value={this.state.email}
                />
                <ButtonRow>
                </ButtonRow>
            </Container>
        );
    }
}




const Container = styled.div`
  margin: 25px;
`

const ButtonRow = styled.div`
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
`

export default Emails;