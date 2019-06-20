import * as React from 'react'
import styled from 'styled-components'
import { Button, FormGroup, InputGroup, H3, Intent, Menu, MenuItem, Popover, Position } from '@blueprintjs/core'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import produce from 'immer'
import * as EmailValidator from 'email-validator'
import { AppToaster } from '../Toaster'

class RejectedEmails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            messageBody: '',
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
        if (this.props.userConfig.emails != null &&
            this.props.userConfig.emails.rejectedSubjectLine != null &&
            this.props.userConfig.emails.rejectedMessageBody != null
        ) {
            let emails = this.props.userConfig.emails
            this.setState({
                emails: emails,
                ccAddresses: emails.rejectedCCAddresses,
                bccAddresses: emails.rejectedBCCAddresses,
                subjectLine: emails.rejectedSubjectLine,
                messageBody: emails.rejectedMessageBody
            })
        }
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value })

    handleQuillChange = (content, delta, source, editor) => {
        const text = editor.getText(content);
        this.setState ({ content: text, messageBody: content });
    }

    saveSettings = async () => {
        if (this.state.subjectLine.length === 0) {
            this.showToast('Subject line required')
        }
        else if (this.state.content.length > 2500) {
            this.showToast('Message body has a limit of 2500 characters')
        }
        else {
            try {
                await this.props.updateUserConfig('emails', {
                    ...this.props.userConfig.emails,
                    rejectedCCAddresses: this.state.ccAddresses,
                    rejectedBCCAddresses: this.state.bccAddresses,
                    rejectedSubjectLine: this.state.subjectLine,
                    rejectedMessageBody: this.state.messageBody,
                },
                    {
                        emails: {
                            ...this.props.userConfig.emails,
                            rejectedCCAddresses: this.state.ccAddresses,
                            rejectedBCCAddresses: this.state.bccAddresses,
                            rejectedSubjectLine: this.state.subjectLine,
                            rejectedMessageBody: this.state.messageBody,
                        }
                    }
                )
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    handleAddClick = (addressType) => {
        let address = '';
        addressType === 'ccAddresses' ? address = 'ccAddress' : address = 'bccAddress'
        if (!EmailValidator.validate(this.state[address])) {
            this.showToast('Not a valid email address')
        }
        else if (!this.state[addressType]) {
            this.setState({ [addressType]: this.state[address] })
        }
        else if (!(this.state[addressType].filter((email) => (email === this.state[address])).length > 0) &&
            !(this.state[address] === '')) {
            this.setState(produce(draft => { draft[addressType].push(draft[address]) }))
        }
    }

    handleDelete = (index, addressType) => {
        this.setState({
            [addressType]: this.state[addressType].filter((e, i) => {
                return i !== index;
            })
        })
    }

    showToast = (message) => {
        AppToaster.show({ message: message });
    }

    renderListItem = (data, addressType) => {
        if (data) {
            return (
                <div>
                    {data.map((d, index) => {
                        return (<li key={d}>{d}
                            <Button intent={Intent.NONE}
                                icon="cross"
                                minimal={true}
                                onClick={() => this.handleDelete(index, addressType)}
                            /></li>)
                    })}
                </div>
            )
        }
    }

    render() {
        const renderAddCC = (
            <Button minimal={true} text='Add Address' onClick={() => this.handleAddClick('ccAddresses')} />
        )
        const renderAddBCC = (
            <Button minimal={true} text='Add Address' onClick={() => this.handleAddClick('bccAddresses')} />
        )
        return (
            <Container>
                <SettingsContainer>
                    <FormGroup
                        label="CC addresses"
                    >
                        <InputGroup name="ccAddress" onChange={this.handleChange} rightElement={renderAddCC} />
                    </FormGroup>
                    {this.renderListItem(this.state.ccAddresses, 'ccAddresses')}
                    <FormGroup
                        label="BCC addresses"
                    >
                        <InputGroup name="bccAddress" onChange={this.handleChange} rightElement={renderAddBCC} />
                    </FormGroup>
                    {this.renderListItem(this.state.bccAddresses, 'bccAddresses')}
                    <FormGroup
                        label="Subject Line"
                    >
                        <InputGroup name="subjectLine" onChange={this.handleChange} value={this.state.subjectLine} />
                    </FormGroup>
                    <FormGroup
                        label='Message Body'
                        helperText='2500 character limit'
                    >
                        <ReactQuill
                            onChange={this.handleQuillChange}
                            value={this.state.messageBody}
                            name='messageBody'
                        />
                    </FormGroup>
                    <ButtonRow>
                        <Button
                            text='Save Pickup Rejected Email Format'
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

export default RejectedEmails;