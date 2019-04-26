import * as React from 'react'
import styled from 'styled-components'
import { Button, FormGroup, InputGroup, H3, Intent, Menu, MenuItem, Popover, Position, TextArea } from '@blueprintjs/core'
import produce from 'immer'
import * as EmailValidator from 'email-validator'
import { AppToaster } from '../Toaster'
import { API } from "aws-amplify"


class Emails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messageBody: '',
            fromAddress: '',
            subjectLine: '',
            ccAddress: '',
            ccAddresses: [],
            bccAddress: '',
            bccAddresses: [],
            emails: {},
        }
    }

    componentDidMount = async () => {
        if (!this.props.authState) {
            return;
        }
        try {
            if (this.props.userConfig.emails != null) {
                this.setState({ 
                    emails: this.props.userConfig.emails,
                    fromAddress: this.props.userConfig.emails.fromAddress,
                    ccAddresses: this.props.userConfig.emails.ccAddresses,
                    bccAddresses: this.props.userConfig.emails.bccAddresses,
                    subjectLine: this.props.userConfig.emails.subjectLine,
                    messageBody: this.props.userConfig.emails.messageBody
                })
            }
        } catch (e) {
            alert(e);
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    saveSettings = async () => {
        if (this.state.fromAddress.length === 0) {
            this.showToast('FROM email address required')
        }
        else if (this.state.subjectLine.length === 0) {
            this.showToast('Subject line required')
        }
        else if (!EmailValidator.validate(this.state.fromAddress)) {
            this.showToast('FROM address is not a valid email address')
        }
        else {
            try {
                await this.props.updateUserConfig('emails', {
                    emails: {
                        fromAddress: this.state.fromAddress,
                        ccAddresses: this.state.ccAddresses,
                        bccAddresses: this.state.bccAddresses,
                        subjectLine: this.state.subjectLine,
                        messageBody: this.state.messageBody,
                    }}, 
                    {
                        emails: {
                            fromAddress: this.state.fromAddress,
                            ccAddresses: this.state.ccAddresses,
                            bccAddresses: this.state.bccAddresses,
                            subjectLine: this.state.subjectLine,
                            messageBody: this.state.messageBody,
                    }}
                    )
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    handleCCAddClick = () => {
        if (!EmailValidator.validate(this.state.ccAddress)) {
            this.showToast('CC email is not a valid email address')
        }
        else if(!this.state.ccAddresses){
            this.setState({ccAddresses: [this.state.ccAddress]})
        }
        else if (!(this.state.ccAddresses.filter((cc) => (cc === this.state.ccAddress)).length > 0) &&
            !(this.state.ccAddress === '')) {
            this.setState(produce(draft => { draft.ccAddresses.push(draft.ccAddress) }))
        }
    }

    handleBCCAddClick = () => {
        if (!EmailValidator.validate(this.state.bccAddress)) {
            this.showToast('BCC email is not a valid email address')
        }
        else if(!this.state.ccAddresses){
            this.setState({bccAddresses: [this.state.bccAddress]})
        }
        else if (!(this.state.bccAddresses.filter((bcc) => (bcc === this.state.bccAddress)).length > 0) &&
            !(this.state.bccAddress === '')) {
            this.setState(produce(draft => { draft.bccAddresses.push(draft.bccAddress) }))
        }
    }

    handleCCDelete = (index) => {
        this.setState({
            ccAddresses: this.state.ccAddresses.filter(function (e, i) {
                return i !== index;
            })
        })
    }

    handleBCCDelete = (index) => {
        this.setState({
            bccAddresses: this.state.bccAddresses.filter(function (e, i) {
                return i !== index;
            })
        })
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    renderCCListItem = (data) => {
        if (data) {
            return (
                <div>
                    {data.map((d, index) => {
                        return (<li key={d}>{d}
                            <Button intent={Intent.NONE}
                                icon="cross"
                                minimal={true}
                                onClick={() => this.handleCCDelete(index)}
                            /></li>)
                    })}
                </div>
            )
        }
    }

    renderBCCListItem = (data) => {
        if (data) {
            return (
                <div>
                    {data.map((d, index) => {
                        return (<li key={d}>{d}
                            <Button intent={Intent.NONE}
                                icon="cross"
                                minimal={true}
                                onClick={() => this.handleBCCDelete(index)}
                            /></li>)
                    })}
                </div>
            )
        }
    }

    render() {
        const renderAddCC = (
            <Button minimal={true} text='Add Address' onClick={this.handleCCAddClick} />
        )
        const renderAddBCC = (
            <Button minimal={true} text='Add Address' onClick={this.handleBCCAddClick} />
        )
        return (
            <Container>
                <H3>Manage Emails</H3>
                <SettingsContainer>
                    <FormGroup
                        label="FROM address"
                    >
                        <InputGroup name="fromAddress" onChange={this.handleChange} value={this.state.fromAddress} />
                    </FormGroup>
                    <FormGroup
                        label="CC addresses"
                    >
                        <InputGroup name="ccAddress" onChange={this.handleChange} rightElement={renderAddCC} />
                    </FormGroup>
                    {this.renderCCListItem(this.state.ccAddresses)}
                    <FormGroup
                        label="BCC addresses"
                    >
                        <InputGroup name="bccAddress" onChange={this.handleChange} rightElement={renderAddBCC} />
                    </FormGroup>
                    {this.renderBCCListItem(this.state.bccAddresses)}
                    <FormGroup
                        label="Subject Line"
                    >
                        <InputGroup name="subjectLine" onChange={this.handleChange} value={this.state.subjectLine} />
                    </FormGroup>
                    <FormGroup
                        label='Message Body'
                    >
                        <TextArea
                            small='true'
                            intent={Intent.PRIMARY}
                            onChange={this.handleChange}
                            value={this.state.messageBody}
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