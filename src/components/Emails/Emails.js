import * as React from 'react'
import styled from 'styled-components'
import { Button, FormGroup, InputGroup, H3, Intent, Menu, MenuItem, Popover, Position, TextArea } from '@blueprintjs/core'
import produce from 'immer'


class Emails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messageBody: '',
            fromAddress: '',
            subjectLine: '',
            ccAddress: '',
            ccAddresses: [],
        }
    }

    componentDidMount() {
        this.setState({
            email: []
        })
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    saveSettings = () => {
        console.log('saved')
    }

    handleAddClick = () => {
        if (!(this.state.ccAddresses.filter((cc) => (cc === this.state.ccAddress)).length > 0) && 
            !(this.state.ccAddress === '')) {
            this.setState(produce(draft => { draft.ccAddresses.push(draft.ccAddress) }))
        }
    }

    render() {
        const renderAddCC = (
            <Button minimal={true} text='Add Address' onClick={this.handleAddClick}/>
        )
        return (
            <Container>
                <H3>Manage Emails</H3>
                <SettingsContainer>
                    <FormGroup
                        label="FROM address"
                    >
                        <InputGroup name="fromAddress" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup
                        label="CC addresses"
                    >
                        <InputGroup name="ccAddress" onChange={this.handleChange} rightElement={renderAddCC}/>
                    </FormGroup>
                    <div>{ this.state.ccAddresses.map( cc => {return (<li>{cc}</li>)} ) }</div>
                    <FormGroup
                        label="Subject Line"
                    >
                        <InputGroup name="subjectLine" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup
                        label='Message Body'
                    >
                        <TextArea
                            small={true}
                            intent={Intent.PRIMARY}
                            onChange={this.handleChange}
                            value={this.state.emailBody}
                            fill={true}
                            name='messageBody'
                        />
                    </FormGroup>
                    <ButtonRow>
                        <Button
                            text='Save'
                            onClick={this.saveSettings}
                        />
                    </ButtonRow>
                </SettingsContainer>
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

const SettingsContainer = styled.div`
    margin-left: 20px;
    width: 500px;
`

export default Emails;